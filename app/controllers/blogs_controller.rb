class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])

    if @user
      if current_user
        @current_user_is_following = current_user.is_following?(@user)
        @posts = @user.publicly_visible_posts.order(created_at: :desc).reject do |x| 
          current_user.block_post?(x) 
        end
      else
        @posts = @user.publicly_visible_posts.order(created_at: :desc)
      end
      
      render :show
    else
      respond_with 404
    end
  end
end
