json.id post.id
json.post_type post.post_type
json.number_of_likes post.likes.count
json.is_private post.is_private
json.is_rebloggable post.is_rebloggable
json.created_at post.created_at

json.user post.user, :id, :username, :description, :require_permission_to_follow, :guaranteed_profile_pic_url

if current_user
  json.current_user_likes_this current_user.likes? post
end

case post.post_type
when "text_post"
  json.body post.body
  json.title post.title
when "reblog"
  json.body post.body
  json.title post.title
  json.parent_id post.parent_id
  json.ancestors post.parent_chain do |ancestor|
    json.partial! 'api/posts/post.json.jbuilder', post: ancestor  
  end
end

json.reblogs post.reblogs do |reblog|
  json.body reblog.body
  json.title reblog.title
  json.id reblog.id
  json.user reblog.user
end

json.tags post.tags.map(&:tag)
