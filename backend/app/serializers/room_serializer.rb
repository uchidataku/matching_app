# frozen_string_literal: true

# RoomSerializer
class RoomSerializer < ActiveModel::Serializer
  attributes :id

  attribute :latest_message do
    object.messages[-1]
  end

  attribute :other_account do
    AccountSerializer.new(object.accounts.where.not(id: current_account.id).first)
  end
  
  has_many :messages
end
