# frozen_string_literal: true
module Api
  # AccountsController
  class AccountsController < ApplicationController
    before_action :set_account, only: %i[show update]
    
    def index
      @accounts = Account.where.not(id: current_account.id)
      render json: @accounts
    end
    
    def show
      render json: @account
    end

    def update
      @account.update!(resource_params)
      if params[:account][:avatar]
        File.open(params[:account][:avatar]) do |io|
          @account.avatar.attach(io: io, filename: params[:account][:avatar].original_filename)
        end
      end

      render json: @account
    end

    def current
      @account = current_account
      render json: @account
    end

    private

    def resource_params
      params.require(:account).permit(
      :username,
        :gender,
        :birthday,
        :prefecture,
        :introduction
      )
    end
    
    def set_account
      @account = Account.find(params[:id])
    end
  end
end
