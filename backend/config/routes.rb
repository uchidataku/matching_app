# frozen_string_literal: true

Rails.application.routes.draw do
  get '/health', to: proc {
    [200, {}, ['']]
  }

  namespace :api do
    post :sign_in, to: 'auth#sign_in'
    post :sign_up, to: 'auth#sign_up'
    get :current_account, to: 'accounts#current'

    resources :accounts, except: %i[create destroy] do
      resources :likes, only: %i[index create]
    end
    resources :rooms, only: %i[index show] do
      resources :messages, only: :create
    end
  end
end
