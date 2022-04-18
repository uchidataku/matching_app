# frozen_string_literal: true

# AccountSerializer
class AccountSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :gender, :birthday, :prefecture, :introduction, :avatar_url
end
