class Api::DashboardController < ApplicationController
  def dashboard
    if current_user
      @posts = current_user.interesting_posts
    else
      @posts = TextPost.all.sort_by { |x| -1 * x.created_at.to_i }
    end

    render "api/dashboard/dashboard.json.jbuilder"
  end
end
