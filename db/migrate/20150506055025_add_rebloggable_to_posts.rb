class AddRebloggableToPosts < ActiveRecord::Migration
  def change
    add_column :text_posts, :rebloggable, :boolean
  end
end
