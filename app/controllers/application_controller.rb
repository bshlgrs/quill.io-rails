class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :markdown

  def markdown
    @markdown ||= begin
      renderer = Redcarpet::Render::HTML.new(:filter_html => true)
      Redcarpet::Markdown.new(renderer, :lax_spacing => true, :hard_wrap => true)
    end
  end

  helper_method :reblog_url

  def reblog_url(post)
    "#{root_url}?reblog=#{post.id}&reblog_type=#{post.class.name}"
  end

  helper_method :reblog_link

  def reblog_link(post, classes)
    "<a href=\"#{reblog_url(post)}\" class=\"#{classes}\"><span class=\"glyphicon glyphicon-retweet\" aria-hidden=\"true\"></span></a>".html_safe
  end

  helper_method :quote

  def quote(string)
    string.split("\n").map { |x| "> #{x}"}.join("\n").html_safe
  end

  helper_method :get_post_url

  def get_post_url(thing)
    case thing
    when TextPost
      blog_post_url(thing.user, thing)
    when Reblog
      blog_reblog_url(thing.user, thing)
    end
  end
end
