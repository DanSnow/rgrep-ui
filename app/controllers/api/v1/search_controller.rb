require "#{Rails.root}/app/workers/rgrep_search"

class Api::V1::SearchController < ApiController
  FILE_PATH = Rails.root.join('../fixture/youtube_1.gais').expand_path.to_s

  def index
    redis = Redis.new(db: 7)
    query = safe_params[:query]
    insensitive = safe_params.key?(:insensitive)
    page = safe_params.key?(:page) ? safe_params[:page].to_i : 1
    skip = (page - 1) * 10
    query_opt = {}

    if insensitive
      query_opt = { insensitive: true }
    end
    cache_key = query_opt.merge({ query: query })

    if redis.hexists('query:cache', Marshal.dump(cache_key))
      datas = Marshal.load(redis.hget('query:cache', Marshal.dump(cache_key)))
      data = datas.drop(skip).take(10)
      Rails.logger.info('Load from cache')
      puts 'Load from cache'
    else
      rgrep = ::RGrep::RGrep.new(query, FILE_PATH, query_opt.merge({ limit: 10 }))
      data = rgrep.run.to_a
      RGrepSearch.perform_async(query, query_opt)
    end
    render json: data
  end

  def safe_params
    params.permit(:query, :insensitive, :page)
  end
end
