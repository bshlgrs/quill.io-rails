class DashboardController < ApplicationController
  def dashboard
    @interesting_posts = current_user.interesting_posts
    @posts = @interesting_posts.flat_map { |x| x.relevant_posts }
    @users = @posts.map(&:user)

    render :dashboard
  end
end
