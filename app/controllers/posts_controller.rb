class PostsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = TextPost.find(params[:id])
    render :show
  end

  def create
    case params[:post_type]
    when "text_post"
      @post = TextPost.new(params.require(:post).permit(:title, :body))
    when "reblog"
      @post = Reblog.new(params.require(:post).permit(:title, :body))
      @post.rebloggable_id = params[:parent_id]
      @post.rebloggable_type = params[:parent_type]
    else
      fail
    end
    
    @post.user = current_user
    @post.save!
    redirect_to "/" 
  end
end
