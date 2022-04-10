# frozen_string_literal: true
FactoryBot.define do
  factory :room_account do
    association :room
    association :account
  end
end
