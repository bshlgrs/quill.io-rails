class Api::ReblogsController < ApplicationController
  def show
    @reblog = Reblog.find(params[:id])
    render "reblogs/reblog.json.jbuilder"
  end
end
