class Api::PostsController < ApplicationController
  before_action :authenticate_user!

  def show
    @post = Post.find(params[:id])
    if @post
      render "api/posts/post.json.jbuilder"
    else
      render status: 404
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
end
