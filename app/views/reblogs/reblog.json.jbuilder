json.(@reblog, :created_at, :updated_at, :user_id, :body, :rebloggable_id, :rebloggable_type)
json.number_of_likes @reblog.likes.count
json.type "Reblog"