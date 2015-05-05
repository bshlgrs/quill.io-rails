class PostsController < ApplicationController
  def index
    @posts = TextPost.all.order(created_at: :desc)
    render :index
  end

  def show
    @post = TextPost.find(params[:id])
    render :show
  end

  def create
    @post = TextPost.new(params.require(:post).permit(:title, :body))
    @post.user = current_user
    @post.save!
    redirect_to "/"
  end


end
