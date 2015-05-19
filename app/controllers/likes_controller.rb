class LikesController < ApplicationController
  before_action :authenticate_user!

  def like
    @post = Post.find(params[:post_id])

    if @post and @post.user_id != current_user.id
      Like.create!(:user_id => current_user.id, :post_id => params[:post_id])
      redirect_to :back
    else
      flash.alert << "liking was unsuccessful"
    end
  end

  def unlike
    Like.where(:user_id => current_user.id, :post_id => params[:post_id]).delete_all

    redirect_to :back
  end
end
