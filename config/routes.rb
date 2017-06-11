Rails.application.routes.draw do

  devise_for :users
  resources :pins
  get 'pins/pin_index'
  root "home#index"
end
