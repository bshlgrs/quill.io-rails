class FollowingController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = current_user.followed_users
    render :index
  end
end
