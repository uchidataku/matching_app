# frozen_string_literal: true
module Api
  # RoomsController
  class RoomsController < ApplicationController
    def index
      @rooms = current_account.rooms.order(created_at: :desc)
      render json: @rooms
    end

    def show
      @room = Room.find(params[:id])
      render json: @room
    end
  end
end
