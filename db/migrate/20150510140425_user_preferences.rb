class UserPreferences < ActiveRecord::Migration
  def change
    add_column :users, :blocked_words, :string, :null => false, default: ""
    add_column :users, :profile_pic_url, :string
    add_column :users, :description, :string, :null => false, default: ""
    add_column :users, :require_permission_to_follow, :boolean, null: false, default: false
  end
end
