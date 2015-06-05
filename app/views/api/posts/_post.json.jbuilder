json.id post.id
json.post_type post.post_type
json.number_of_likes post.likes.count
json.is_private post.is_private
json.is_rebloggable post.is_rebloggable
json.created_at post.created_at
json.number_of_reblog_descendants post.number_of_reblog_descendants

json.user_id post.user_id

if current_user
  json.current_user_likes_this current_user.likes? post
  json.current_user_is_interested_in_this current_user.is_interested_in_post? post
end

case post.post_type
when "text_post"
  json.body post.body
  json.title post.title
when "reblog"
  json.body post.body
  json.title post.title
  json.parent_id post.parent_id
  json.ancestors post.parent_chain.map(&:id)
end

json.reblogs post.reblogs do |reblog|
  json.id reblog.id
end

json.tags post.tags.map(&:tag)
