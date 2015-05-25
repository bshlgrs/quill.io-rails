Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  
  root to: 'dashboard#dashboard'

  resources :blogs, :only => [:show] do
    resources :posts, :only => [:show] do
      get "raw"
    end

    resources :reblogs, :only => [:show]
  end

  namespace :admin do
    resources :users, :only => [:index]
  end

  namespace :api do
    resources :posts, :only => [:show, :destroy, :create] do
      post "like", to: "likes#like", as: "like"
      post "unlike", to: "likes#unlike", as: "unlike"
    end
    resources :blogs, :only => [:show]

    resources :users, :only => [] do
      post "follow", to: "user_relationships#follow", as: "follow"
      post "unfollow", to: "user_relationships#unfollow", as: "unfollow"
    end

    get "dashboard", to: "dashboard#dashboard", as: "dashboard"
    get "top_posts", to: "dashboard#top_posts", as: "top_posts"
  end

  get "following", to: "following#index", as: "following"
  get "followers", to: "followers#index", as: "followers"

  get "tags/:tag", to: "tags#show", as: "tag"

  post "users/:user_id/follow", :to => "relationships#follow", :as => "follow"
  post "users/:user_id/unfollow", :to => "relationships#unfollow", :as => "unfollow"

  post "posts/:post_type/:post_id/like", :to => "likes#like", :as => "like"
  post "posts/:post_type/:post_id/unlike", :to => "likes#unlike", :as => "unlike"

  resources :posts, :only => [:create, :index]

  resources :reblogs, :only => [:create]

  resource "preferences", :only => [:show, :update]
end
