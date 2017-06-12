Rails.application.routes.draw do

  devise_for :users
  resources :pins
  get 'pins/pin_index'
  get 'home/map'
  root "home#index"
end
