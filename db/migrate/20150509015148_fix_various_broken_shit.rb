class FixVariousBrokenShit < ActiveRecord::Migration
  def change
    change_column :user_relationships, :from_user, :integer, :null => false
    change_column :user_relationships, :to_user, :integer, :null => false
    change_column :user_relationships, :relationship_type, :string, :null => false
    change_column :text_posts, :rebloggable, :boolean, :null => false
  end
end
