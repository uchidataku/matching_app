# frozen_string_literal: true
FactoryBot.define do
  factory :account do
    sequence(:email) { |n| "sample_#{n}@example.com" }
    passwrod { 'password' }
    sequence(:username) { |n| "user_#{n}" }
  end
end
