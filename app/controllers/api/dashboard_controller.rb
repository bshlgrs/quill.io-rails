class Api::DashboardController < ApplicationController
  def dashboard
    if current_user
      @posts = current_user.interesting_posts
    else
      @posts = TextPost.order("created_at ASC").limit(30)
    end

    render "api/dashboard/dashboard.json.jbuilder"
  end
end
