# frozen_string_literal: true
module JWT
  # JWT Authenticatable
  module Authenticatable
    extend ActiveSupport::Concern

    included do
      def jwt
        iat = Time.now.to_i
        exp = iat + 7 * 24 * 3600 # 期限は1週間
        payload = { iat: iat, exp: exp, sub: id }
        JWT::Helper.encode(payload)
      end
    end

    class_methods do
      def authenticate!(token)
        payload, _header = JWT::Helper.decode(token, algorithm: 'HS256')
        find(payload['sub'])
      end
    end
  end
end
