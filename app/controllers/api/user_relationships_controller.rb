class Api::UserRelationshipsController < ApplicationController
  before_action :authenticate_user!

  def follow
    current_user.follow(User.find(params[:user_id]))
    render nothing: true, status: 200
  end

  def unfollow
    current_user.unfollow(User.find(params[:user_id]))
    render nothing: true, status: 200
  end
end
