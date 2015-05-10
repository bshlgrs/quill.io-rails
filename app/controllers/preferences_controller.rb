class PreferencesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
    render :show
  end

  def update
    @user = current_user
    @user.blocked_words = params[:user][:blocked_words]
    @user.description = params[:user][:description]

    if params[:user][:require_permission_to_follow]
      @user.require_permission_to_follow = params[:user][:require_permission_to_follow]
    end

    @user.save!
    render :show
  end
end
