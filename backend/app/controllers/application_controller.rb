# frozen_string_literal: true

# ApplicationController
class ApplicationController < ActionController::API
  before_action :authenticate_account!

  attr_reader :current_account

  def authenticate_account!
    @current_jwt = /Bearer (.*)/.match(request.headers[:Authorization]).to_a[1]
    Rails.logger.info('current_jwt')
    Rails.logger.info(@current_jwt)
    @current_account = Account.authenticate!(@current_jwt)
  end
end
