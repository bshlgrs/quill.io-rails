class UserRelationshipsController < ApplicationController
  before_action :authenticate_user!

  def follow
    current_user.follow(User.find(params[:user_id]))
    redirect_to :back
  end

  def unfollow
    current_user.unfollow(User.find(params[:user_id]))
    redirect_to :back
  end
end
