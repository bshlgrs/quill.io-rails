class LikesController < ApplicationController
  before_action :authenticate_user!

  def like
    Like.create!(:user_id => current_user.id, :post_id => params[:post_id])

    redirect_to :back
  end

  def unlike
    Like.where(:user_id => current_user.id, :post_id => params[:post_id]).delete_all

    redirect_to :back
  end
end
