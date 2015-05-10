class RenamePrivateToIsPrivate < ActiveRecord::Migration
  def change
    rename_column :text_posts, :private, :is_private
    rename_column :reblogs, :private, :is_private
  end
end
