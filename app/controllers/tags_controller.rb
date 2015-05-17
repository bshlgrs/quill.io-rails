class TagsController < ApplicationController
  def show
    @posts = Tag.where(:tag => params[:tag]).includes(:post).map { |x| x.post }
    @tag = params[:tag]
    render :show
  end
end
