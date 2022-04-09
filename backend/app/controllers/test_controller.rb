# frozen_string_literal: true
module Api
  # TestController
  class TestController < ApplicationController
    def index
      render json: { message: 'hello' }
    end
  end
end
