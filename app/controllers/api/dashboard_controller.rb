class Api::DashboardController < ApplicationController
  def dashboard
    if current_user
      @posts = current_user.interesting_posts
    else
      @posts = Post.order(created_at: :desc).limit(30)
    end

    render "api/dashboard/dashboard.json.jbuilder"
  end
end
