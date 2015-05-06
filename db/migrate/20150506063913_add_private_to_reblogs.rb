class AddPrivateToReblogs < ActiveRecord::Migration
  def change
    add_column :reblogs, :private, :boolean, null: false, default: false
  end
end
