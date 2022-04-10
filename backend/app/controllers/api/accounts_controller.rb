# frozen_string_literal: true
module Api
  # AccountsController
  class AccountsController < ApplicationController
    def edit
      @account = Account.find(params[:id])
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
  end
end
