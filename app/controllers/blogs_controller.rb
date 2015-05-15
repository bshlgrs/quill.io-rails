class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    @posts = @user.posts.where(:is_private => false).order(created_at: :desc)
    render :show
  end
end
