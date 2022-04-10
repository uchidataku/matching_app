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

    def edit
      @account.update!(resource_params)
      render json: @account
    end

    private

    def resource_params
      params.require(:account).permit(
        :gender,
        :birthday,
        :prefecture,
        :introduction,
        :avatar
      )
    end
    
    def set_account
      @account = Account.find(params[:id])
    end
  end
end
