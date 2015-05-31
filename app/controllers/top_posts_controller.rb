class TopPostsController < ApplicationController
  def top_posts
    @posts = Post.top_posts
    render :index
  end
end
