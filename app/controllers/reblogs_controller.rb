class ReblogsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = Reblog.find(params[:id])
    render "posts/show"
  end

  def create
    @post = Reblog.new(params.require(:post).permit(:title, :body, :rebloggable, :private))
    @post.rebloggable_id = params[:parent_id]
    @post.rebloggable_type = params[:parent_type]

    @post.user = current_user
    @post.save!
    redirect_to "/" 
  end
end
