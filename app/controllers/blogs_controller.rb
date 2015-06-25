class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])

    if @user
      if current_user
        @current_user_is_following = current_user.is_following?(@user)
        @top_level_posts = @user.publicly_visible_posts.order(created_at: :desc).reject do |x| 
          current_user.block_post?(x) 
        end
      else
        @top_level_posts = @user.publicly_visible_posts.order(created_at: :desc)
      end

      @posts = @top_level_posts.flat_map { |x| x.relevant_posts }  

      @users = @posts.map(&:user)
      render :show
    else
      respond_with 404
    end
  end
end
