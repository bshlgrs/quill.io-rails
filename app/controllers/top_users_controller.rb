class TopUsersController < ApplicationController
  def top_users
    @users = User.top_users
    render :index
  end
end
