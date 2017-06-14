Rails.application.routes.draw do

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  devise_for :users
  resources :pins
  # get 'pins/pin_index'
  get 'home/map'
  get 'reports/index'
  root "home#index"
end
