class Api::BlogsController < ApplicationController
  def show
    @user = User.find(params[:id])

    render "show.json.jbuilder"
  end
end
