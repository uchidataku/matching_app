# frozen_string_literal: true
# Room
class Room < ApplicationRecord
  has_many :room_accounts
  has_many :accounts, through: :room_accounts
  has_many :messages
end
