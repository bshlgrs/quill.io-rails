class RenameOtherThings < ActiveRecord::Migration
  def change
    rename_column :text_posts, :rebloggable, :is_rebloggable
    add_column :reblogs, :is_rebloggable, :boolean

    drop_table :friendly_id_slugs
  end
end
