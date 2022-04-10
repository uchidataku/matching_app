# frozen_string_literal: true
FactoryBot.define do
  factory :account do
    sequence(:email) { |n| "sample_#{n}@example.com" }
    password { 'password' }
    sequence(:username) { |n| "user_#{n}" }
    gender { Account::Gender::MALE }
  end
end
