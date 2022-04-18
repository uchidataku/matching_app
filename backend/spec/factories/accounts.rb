# frozen_string_literal: true
FactoryBot.define do
  factory :account do
    sequence(:email) { |n| "sample_#{n}@example.com" }
    password { 'password' }
    sequence(:username) { |n| "user_#{n}" }
    gender { Account::Gender::MALE }

    trait :with_avatar do
      before(:create) do |account|
        account.avatar.attach(
          io: File.open('spec/fixtures/sample_image.JPG'), filename: 'sample_image.jpg', content_type: 'image/jpeg'
        )
      end
    end
  end
end
