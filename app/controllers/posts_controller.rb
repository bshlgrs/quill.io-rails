class PostsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = TextPost.find(params[:id])
    render :show
  end

  def create
    @post = TextPost.new(params.require(:post).permit(:title, :body))
    @post.is_rebloggable = params[:post][:is_private] == "on"
    @post.is_private = params[:post][:is_private] == "on"
    @post.user = current_user
    @post.save!
    redirect_to "/" 
  end
end
