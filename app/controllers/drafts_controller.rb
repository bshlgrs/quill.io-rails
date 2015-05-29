class DraftsController < ApplicationController
  before_action :authenticate_user!, :only => [:index]

  def index
    @posts = current_user.drafts
    render :index
  end
end