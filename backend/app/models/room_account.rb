# frozen_string_literal: true
# RoomAccount
class RoomAccount < ApplicationRecord
  belongs_to :account
  belongs_to :room
  
  validates :account_id, uniqueness: { scope: :room_id }
end
