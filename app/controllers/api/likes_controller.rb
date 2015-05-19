class Api::LikesController < ApplicationController
  before_action :authenticate_user!

  def like
    @post = Post.find(params[:post_id])
    if @post and @post.user_id != current_user.id
      Like.create!(:user_id => current_user.id, :post_id => params[:post_id])
      render nothing: true, status: 200
    else
      render nothing: true, status: 404
    end
  end

  def unlike
    Like.where(:user_id => current_user.id, :post_id => params[:post_id]).delete_all
    render nothing: true, status: 200
  end
end
