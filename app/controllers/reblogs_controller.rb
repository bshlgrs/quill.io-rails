class ReblogsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = Reblog.find(params[:id])
    render :show
  end

  def create
    @reblog = Reblog.new(params.require(:post).permit(:title, :body))
    @reblog.rebloggable_id = params[:parent_id]
    @reblog.rebloggable_type = params[:parent_type]

    @reblog.user = current_user
    @reblog.save!
    redirect_to "/" 
  end
end
