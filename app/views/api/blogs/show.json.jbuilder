json.extract! @user, :id, :username, :description, :profile_pic_url

json.posts @user.all_posts do |post|
  json.partial! 'api/posts/post', post: post
end