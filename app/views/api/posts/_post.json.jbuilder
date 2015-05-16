json.id post.id
json.type post.class.name
json.number_of_likes post.likes.count
json.is_private post.is_private
json.is_rebloggable post.is_rebloggable
json.created_at post.created_at

case post.post_type
when "text_post"
  json.body post.body
  json.title post.title
when "reblog"
  json.body post.body
  json.title post.title
  json.rebloggable_id post.rebloggable_id
  json.rebloggable_type post.rebloggable_type
end

json.reblogs post.reblogs do |reblog|
  json.partial! 'api/posts/post', post: reblog
end