class PostsController < ApplicationController
  def index
    @posts = TextPost.all
    render :index
  end

  def show
    @post = TextPost.find(params[:id])
    render :show
  end
end
