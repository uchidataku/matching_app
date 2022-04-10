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
  has_many :likes_from, class_name: 'Like', foreign_key: :from_account_id, dependent: :destroy
  has_many :likes_to, class_name: 'Like', foreign_key: :to_account_id, dependent: :destroy
  has_many :active_like_accounts, through: :likes_from, source: :to_account
  has_many :passive_like_accounts, through: :likes_to, source: :from_account

  enum gender: { male: 0, female: 1 }, _suffix: true

  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :password, length: { minimum: 8 }, if: -> { password.present? }
  validates :username, presence: true, uniqueness: true
end
