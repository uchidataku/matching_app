# frozen_string_literal: true

# LikeSerializer
class LikeSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
  
  attribute :is_matched do
    passive_like = Like.find_by(from_account_id: object.to_account_id, to_account_id: object.from_account_id)
    passive_like ? true : false
  end
  
  belongs_to :from_account
  belongs_to :to_account
end
