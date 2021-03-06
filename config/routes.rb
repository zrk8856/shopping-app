Rails.application.routes.draw do
  # In order for namespace to work, you need to create a new folder called api under controllers folder, and move all those namespaced
  # controllers into it. Also, in each namespaced controller, you need to add Api:: in front of the controller's name:
  # class Api::CartsController < ApplicationController instead of class CartsController < ApplicationController
  namespace :api do
    resources :users, only: [] do
      resources :carts, only: [:index]
      resources :addresses, only: [:index]
      resources :orders, only: [:index]
    end
    resources :products, only: [:index, :show]
    resources :carts, only: [:create, :destroy, :update]
    resources :reviews, only: [:create, :update, :destroy]
    resources :orders, only: [:create]
    resources :addresses, only: [:create, :update]

    get "/reviews/highest_rating", to: "reviews#highest_rating"

    get "/search/:search", to: "products#search"
    # The "" and " " search will hit "/search" route.
    get "/search", to: "products#index"

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    post "/forgot", to: "users#forgot"
    post "/reset", to: "users#reset"
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end