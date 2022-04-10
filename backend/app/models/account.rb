# frozen_string_literal: true
# Account
class Account < ApplicationRecord
  include JWT::Authenticatable

  module Gender
    MALE = 'male'
    FEMALE = 'female'
  end

  has_secure_password
  
  has_one_attached :avatar

  enum gender: { male: 0, female: 1 }, suffix: true

  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :password, length: { minimum: 8 }, if: -> { password.present? }
  validates :username, presence: true, uniqueness: true
end
