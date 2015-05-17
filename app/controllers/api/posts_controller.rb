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

  def delete
    @post = Post.find(params[:id])
    if @post
      if @post.user == current_user
        @post.delete
        render status: 204
      else
        render status: 403
      end
    else
      render status: 404
    end
  end
end
