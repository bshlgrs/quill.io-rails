class BlogsController < ApplicationController
  def show
    @user = User.friendly.find(params[:id])
    @posts = (@user.text_posts.where(:private => false) + 
      @user.reblogs.where(:private => false)).sort_by { |x| -1 * x.created_at.to_i }
    render :show
  end
end
