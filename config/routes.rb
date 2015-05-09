Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  
  root to: 'dashboard#dashboard'

  resources :blogs, :only => [:show] do
    resources :posts, :only => [:show]
    resources :reblogs, :only => [:show]
  end

  post "users/:user_id/follow", :to => "relationships#follow", :as => "follow"
  post "users/:user_id/unfollow", :to => "relationships#unfollow", :as => "unfollow"

  resources :posts, :only => [:create]
  resources :reblogs, :only => [:create]
end
