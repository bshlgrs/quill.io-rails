Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  root to: 'posts#index'

  resources :blogs, :only => [:show] do
    resources :posts, :only => [:show]
  end

  resources :posts, :only => [:create]
end
