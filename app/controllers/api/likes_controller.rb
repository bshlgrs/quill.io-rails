class Api::LikesController < ApplicationController
  before_action :authenticate_user!

  def like
    Like.create!(:user_id => current_user.id, :rebloggable_type => params[:post_type], :rebloggable_id => params[:post_id])

    head :ok
  end

  def unlike
    Like.where(:user_id => current_user.id, :rebloggable_type => params[:post_type], :rebloggable_id => params[:post_id]).delete_all

    head :ok
  end
end
