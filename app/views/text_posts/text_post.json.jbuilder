json.(@text_post, :created_at, :updated_at, :user_id, :body)
json.number_of_likes @text_post.likes.count
json.type "TextPost"