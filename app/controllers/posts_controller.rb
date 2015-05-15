class PostsController < ApplicationController
  before_action :authenticate_user!, :only => [:create]

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def create
    case params[:post][:post_type]
    when "text_post"
      @post = Post.new(text_post_params)
      @post.add_tags_from_array(params[:tags].split(" "))

      @post.user = current_user
      @post.save!
    else
      fail
    end
    redirect_to "/"
  end

  private
    def text_post_params
      params.require(:post).permit(:title, :body, :is_rebloggable, :is_private, :post_type)
    end
end
