class DashboardController < ApplicationController
  def dashboard
    @posts = (TextPost.all + Reblog.all).sort_by { |x| -1 * x.created_at.to_i }

    if params[:reblog]
      parent_class = { "TextPost" => TextPost, "Reblog" => Reblog }[params[:reblog_type]]
      @reblogged_post = parent_class.find(params[:reblog])
      @reblog_type = params[:reblog_type]
      render :dashboard_new_reblog
    else
      render :dashboard
    end
  end
end
