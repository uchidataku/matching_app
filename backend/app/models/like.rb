# frozen_string_literal: true
# Like
class Like < ApplicationRecord
  belongs_to :from_account, class_name: 'Account'
  belongs_to :to_account, class_name: 'Account'

  validates :from_account_id, uniqueness: { scope: :to_account_id }
end
