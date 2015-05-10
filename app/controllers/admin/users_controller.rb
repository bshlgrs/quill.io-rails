class Admin::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user && current_user.is_admin
      @users = User.all
      render :index
    else
      redirect_to :root
    end
  end
end


