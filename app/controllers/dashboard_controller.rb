class DashboardController < ApplicationController
  def dashboard
    @posts = TextPost.all.order(created_at: :desc)
    render :dashboard
  end
end
