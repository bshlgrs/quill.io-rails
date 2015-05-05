class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    @posts = @user.text_posts
    render :show
  end
end
