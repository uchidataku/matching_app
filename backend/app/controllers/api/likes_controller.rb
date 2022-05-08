# frozen_string_literal: true
module Api
  # LikesController
  class LikesController < ApplicationController
    def index
      account = Account.find_by(id: params[:account_id])
      @accounts = account.active_like_accounts
      render json: @accounts
    end

    def create
      @like = Like.create!(resource_params.merge(from_account_id: current_account.id))
      passive_like = Like.find_by(to_account_id: current_account.id, from_account_id: @like.to_account_id)
      if passive_like
        room = Room.create!
        RoomAccount.find_or_create_by!(room_id: room.id, account_id: current_account.id)
        RoomAccount.find_or_create_by!(room_id: room.id, account_id: @like.to_account_id)
      end
      render json: @like
    end
    
    private
    
    def resource_params
      params.require(:like).permit(:to_account_id)
    end
  end
end
