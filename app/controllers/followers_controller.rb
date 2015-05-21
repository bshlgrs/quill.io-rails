class FollowersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = current_user.followers
    render :index
  end
end
