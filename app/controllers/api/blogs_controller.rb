class Api::BlogsController < ApplicationController
  def show
    @user = User.find_by_username(params[:id])

    render "show.json.jbuilder"
  end
end
