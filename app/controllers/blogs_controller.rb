class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    @posts = @user.interesting_posts
    render :show
  end
end
