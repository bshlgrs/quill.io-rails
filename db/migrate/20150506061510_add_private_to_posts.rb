class AddPrivateToPosts < ActiveRecord::Migration
  def change
    add_column :text_posts, :private, :boolean, null: false, default: false
  end
end
