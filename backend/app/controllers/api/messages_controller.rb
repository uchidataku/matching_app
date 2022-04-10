# frozen_string_literal: true
module Api
  # MessagesController
  class MessagesController < ApplicationController
    def create
      @message = Message.create!(resource_params.merge(account_id: current_account.id, room_id: params[:room_id]))
      render json: @message
    end
    
    private
    
    def resource_params
      params.require(:message).permit(:content)
    end
  end
end
