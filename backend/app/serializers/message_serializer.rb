# frozen_string_literal: true

# MessageSerializer
class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :account_id, :created_at, :updated_at

  belongs_to :room
end
