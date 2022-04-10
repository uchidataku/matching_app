# frozen_string_literal: true
FactoryBot.define do
  factory :like do
    association :from_account, factory: :account
    association :to_account, factory: :account
  end
end
