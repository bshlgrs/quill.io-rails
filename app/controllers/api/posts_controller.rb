class Api::PostsController < ApplicationController
  before_action :authenticate_user!

  def create
    @post = Post.new(post_params)
    if @post.save
      render "api/dashboard/dashboard.json.jbuilder"
    else
      render json: @post.errors.full_messages, status: 400
    end
  end

  def show
    @post = Post.find(params[:id])
    if @post
      render "api/posts/post.json.jbuilder"
    else
      head 404
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post
      if @post.user == current_user
        @post.delete
        head 204
      else
        head 403
      end
    else
      head 404
    end
  end

  private
    def post_params
      params.require(:post).permit(:title, :body, :is_rebloggable, :is_private, :post_type)
    end
end
