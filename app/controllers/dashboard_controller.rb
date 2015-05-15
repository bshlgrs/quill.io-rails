class DashboardController < ApplicationController
  def dashboard
    if current_user
      @posts = current_user.interesting_posts.take(30)
    else
      @posts = TextPost.order("created_at ASC").limit(30)
    end
  end
end
