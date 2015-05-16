json.current_user current_user

json.posts @posts do |post|
  json.partial! 'api/posts/post.json.jbuilder', post: post
end