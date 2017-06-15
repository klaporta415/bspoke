Rails.application.routes.draw do

  devise_for :users
  resources :pins
  # get 'pins/pin_index'
  get 'home/map'
  get 'home/about'
  root "home#index"
end
