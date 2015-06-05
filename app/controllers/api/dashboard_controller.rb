class Api::DashboardController < ApplicationController
  def dashboard
    page = params[:page] || 0
    @posts = current_user.interesting_posts.flat_map { |x| x.reblog_descendants(5, 5) }

    @users = @posts.map(&:user)
    render "api/dashboard/dashboard.json.jbuilder"
  end

  def top_posts
    page = params[:page].to_i || 0
    @posts = Post.order(created_at: :desc).limit(30).drop(page * 30).take(30)

    render "api/dashboard/dashboard.json.jbuilder"
  end
end
