class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])

    if @user
      if current_user
        @posts = @user.posts.where(:is_private => false).order(created_at: :desc).reject { |x| current_user.block_post?(x) }
      else
        @posts = @user.posts.where(:is_private => false).order(created_at: :desc)
      end
      
      render :show
    else
      respond_with 404
    end
  end
end
