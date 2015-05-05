class BlogsController < ApplicationController
  def show
    @user = User.find(params[:id])
    @posts = @user.text_posts
    render :show
  end
end
