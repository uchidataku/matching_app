# frozen_string_literal: true

# MessageSerializer
class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content
  
  belongs_to :account
  belongs_to :room
end
