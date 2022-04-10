# frozen_string_literal: true
# Message
class Message < ApplicationRecord
  belongs_to :room
  belongs_to :account
end
