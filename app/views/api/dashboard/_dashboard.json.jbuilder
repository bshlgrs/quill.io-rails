json.set! :posts do
  @posts.each do |post|
    json.set! post.id do
      json.partial!('api/posts/post.json.jbuilder', post: post)
    end
  end
end

json.set! :users do
  @users.each do |user|
    json.set! user.id do
      json.partial!('api/users/user.json.jbuilder', user: user)
    end
  end
end