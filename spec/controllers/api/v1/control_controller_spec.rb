require 'rails_helper'

RSpec.describe Api::V1::ControlController, type: :controller do

  describe "GET #clear_cache" do
    it "returns http success" do
      get :clear_cache
      expect(response).to have_http_status(:success)
    end
  end

end
