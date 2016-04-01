class RGrepSearch
  include Sidekiq::Worker
  FILE_PATH = Rails.root.join('../fixture/youtube_1.gais').expand_path.to_s

  def perform(query, opts = {})
    redis = Redis.new(db: 7)
    rgrep = RGrep::RGrep.new(query, FILE_PATH)
    datas = rgrep.run.to_a
    redis.hset('query:cache', Marshal.dump(opts.merge({ query: query })), Marshal.dump(datas))
  end
end
