# frozen_string_literal: true
module Api
  # TestController
  class TestController < ApplicationController
    skip_before_action :authenticate_account!

    def index
      render json: { message: 'hello' }
    end
  end
end
