class Api::BlogsController < ApplicationController
  def show
    @user = User.find_by_username(params[:id])

    if @user
      render "show.json.jbuilder"
    else
      head 404
    end
  end
end
