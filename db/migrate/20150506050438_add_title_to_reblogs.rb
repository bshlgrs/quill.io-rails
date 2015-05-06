class AddTitleToReblogs < ActiveRecord::Migration
  def change
    add_column :reblogs, :title, :string
  end
end
