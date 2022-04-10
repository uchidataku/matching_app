# frozen_string_literal: true

Rails.application.routes.draw do
  get '/health', to: proc {
    [200, {}, ['']]
  }

  namespace :api do
    post :sign_in, to: 'auth#sign_in'
    post :sign_up, to: 'auth#sign_up'

    resources :accounts, only: :update
  end
end
