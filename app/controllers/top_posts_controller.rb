class TopPostsController < ApplicationController
  def top_posts
    @top_level_posts = Post.top_posts
    @posts = @top_level_posts.flat_map { |x| x.relevant_posts }
    @users = @posts.map(&:user)
    
    render :index
  end
end
