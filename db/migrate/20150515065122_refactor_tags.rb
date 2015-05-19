class RefactorTags < ActiveRecord::Migration
  def change
    remove_column :tags, :rebloggable_id
    remove_column :tags, :rebloggable_type
    add_column :tags, :post_id, :integer, null: false
  end
end
