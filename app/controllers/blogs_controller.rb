class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    if current_user
      @posts = @user.all_posts.reject { |x| current_user.block_post?(x) }
    else
      @posts = @user.all_posts
    end
    
    render :show
  end
end
