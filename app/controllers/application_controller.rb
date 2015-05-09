class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :markdown

  def markdown
    @markdown ||= begin
      renderer = Redcarpet::Render::HTML.new
      Redcarpet::Markdown.new(renderer, :lax_spacing => true)
    end
  end

  helper_method :reblog_link

  def reblog_link(post, classes)
    "<a href=\"#{root_url}?reblog=#{post.id}&reblog_type=#{post.class.name}\" class=\"#{classes}\">reblog</a>".html_safe
  end

  helper_method :quote

  def quote(string)
    string.split("\n").map { |x| "> #{x}"}.join("\n").html_safe
  end
end
