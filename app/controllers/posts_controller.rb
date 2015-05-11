class PostsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = TextPost.find(params[:id])
    render :show
  end

  def create
    @post = TextPost.new(params.require(:post).permit(:title, :body, :rebloggable, :private))
    @post.rebloggable ||= true
    @post.user = current_user
    @post.save!
    redirect_to "/"
  end
end
