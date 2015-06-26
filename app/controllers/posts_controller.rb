class PostsController < ApplicationController
  before_action :authenticate_user!, :only => [:create, :index]

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def raw
    @post = Post.find(params[:post_id])

    render :text => @post.body
  end

  def create
    case params[:post][:post_type]
    when "text_post"
      @post = Post.new(text_post_params)
      @post.add_tags_from_array(params[:tags].split(" "))
    else
      fail
    end

    @post.is_rebloggable = params[:post][:is_rebloggable] == "on"
    @post.is_private = params[:post][:is_private] == "on"
    @post.user = current_user
    @post.save!

    redirect_to "/"
  end

  def index
    @interesting_posts = current_user.posts
    @posts = @interesting_posts.flat_map { |x| x.relevant_posts }
    @users = @posts.map(&:user)
    render :index
  end

  private
    def text_post_params
      params.require(:post).permit(:title, :body, :is_rebloggable, :is_private, :post_type)
    end
end
