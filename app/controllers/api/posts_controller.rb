class Api::PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    @post.add_tags_from_array(params[:post][:tags].split(" "))

    if @post.save
      render "api/posts/post.json.jbuilder"
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

  def update
    @post = Post.find(params[:id])
    if @post
      if @post.user == current_user
        @post.update!(post_params)
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
      params.require(:post).permit(:title, :body, :is_rebloggable, :is_private, :post_type, :parent_id, :post_status)
    end
end
