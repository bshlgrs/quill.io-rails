json.extract! @user, :id, :username, :description, :profile_pic_url

json.posts @user.all_posts do |post|
  json.id post.id
  json.type post.class.name
  json.number_of_likes post.likes.count
  json.is_private post.is_private
  json.is_rebloggable post.is_rebloggable

  case post
  when TextPost
    json.body post.body
    json.title post.title
  when Reblog 
    json.body post.body
    json.title post.title
    json.rebloggable_id post.rebloggable_id
    json.rebloggable_type post.rebloggable_type
  end

end