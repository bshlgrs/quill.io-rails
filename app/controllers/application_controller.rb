class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :markdown

  def markdown
    @markdown ||= begin
      renderer = Redcarpet::Render::HTML.new
      Redcarpet::Markdown.new(renderer, extensions = {})
    end
  end
end
