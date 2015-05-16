class Api::LikesController < ApplicationController
  before_action :authenticate_user!

  def like
    Like.create!(:user_id => current_user.id, :post_id => params[:post_id])

    respond_with head: :ok
  end

  def unlike
    Like.where(:user_id => current_user.id, :post_id => params[:post_id]).delete_all

    respond_with head: :ok
  end
end
