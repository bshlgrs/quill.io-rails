class Api::TextPostsController < ApplicationController
  def show
    @text_post = TextPost.find(params[:id])
    render "text_posts/text_post.json.jbuilder"
  end
end
