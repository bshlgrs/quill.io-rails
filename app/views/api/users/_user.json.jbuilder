json.id user.id 
json.username user.username 
json.description user.description 
json.require_permission_to_follow user.require_permission_to_follow 
json.guaranteed_profile_pic_url user.guaranteed_profile_pic_url

if current_user
  json.current_user_is_following current_user.is_following?(user)
end