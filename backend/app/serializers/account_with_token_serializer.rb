# frozen_string_literal: true

# AccountWithTokenSerializer
class AccountWithTokenSerializer < ActiveModel::Serializer
  attribute :account do
    AccountSerializer.new(object).as_json
  end

  attribute :token do
    object.jwt
  end
end
