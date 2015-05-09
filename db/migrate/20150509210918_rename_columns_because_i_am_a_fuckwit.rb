class RenameColumnsBecauseIAmAFuckwit < ActiveRecord::Migration
  def change
    rename_column :user_relationships, :from_user, :from_user_id
    rename_column :user_relationships, :to_user, :to_user_id
  end
end
