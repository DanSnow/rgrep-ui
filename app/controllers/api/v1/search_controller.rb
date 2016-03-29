class Api::V1::SearchController < ApiController
  def index
    render json: {status: 'ok'}.merge(safe_params)
  end

  def safe_params
    params.permit(:query, :insensitive)
  end
end
