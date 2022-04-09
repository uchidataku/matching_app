# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  ## Rails Default
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local = false
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
  config.active_support.disallowed_deprecation = :log
  config.active_support.disallowed_deprecation_warnings = []
  config.active_record.dump_schema_after_migration = false

  ## Mailer
  config.action_mailer.perform_caching = false
  config.action_mailer.delivery_method = :smtp
  # config.action_mailer.smtp_settings = {
  #   address: 'smtp.sendgrid.net',
  #   port: 587,
  #   user_name: 'apikey',
  #   password: ENV.fetch('SMTP_PASSWORD'),
  #   authentication: :plain,
  #   enable_starttls_auto: true
  # }

  ## Logger
  if ENV['RAILS_LOG_TO_STDOUT'].present?
    logger           = ActiveSupport::Logger.new($stdout)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end
  config.log_formatter = ::Logger::Formatter.new
  config.log_level = :info
  config.log_tags = [:request_id]
end
