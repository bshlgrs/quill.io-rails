class DashboardController < ApplicationController
  def dashboard
    if current_user
      @posts = current_user.interesting_posts
    else
      @posts = Post.order(created_at: :desc)
    end
  end
end
