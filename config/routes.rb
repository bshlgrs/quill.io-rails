Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  root to: 'dashboard#dashboard'

  resources :blogs, :only => [:show] do
    resources :posts, :only => [:show]
    resources :reblogs, :only => [:show]
  end

  resources :posts, :only => [:create]
  resources :reblogs, :only => [:create]
end
