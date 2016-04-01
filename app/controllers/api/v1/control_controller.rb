class Api::V1::ControlController < ApiController
  def clear_cache
    redis = Redis.new(db: 7)
    redis.del('query:cache')
    render json: { status: 'ok' }
  end
end
