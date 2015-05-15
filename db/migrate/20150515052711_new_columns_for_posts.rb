class NewColumnsForPosts < ActiveRecord::Migration
  def change
    add_column :posts, :is_private, :boolean, null: false, default: false
    add_column :posts, :is_rebloggable, :boolean, null: false, default: false
    add_column :posts, :asker_id, :integer
  end
end
