class Api::DashboardController < ApplicationController
  def dashboard
    page = params[:page] || 0
    if current_user
      @posts = current_user.interesting_posts.drop(page * 30).take(30)
    else
      @posts = Post.order(created_at: :desc).limit(30).drop(page * 30).take(30)
    end

    render "api/dashboard/dashboard.json.jbuilder"
  end

  def top_posts
    page = params[:page].to_i || 0
    @posts = Post.order(created_at: :desc).limit(30).drop(page * 30).take(30)

    render "api/dashboard/dashboard.json.jbuilder"
  end
end
