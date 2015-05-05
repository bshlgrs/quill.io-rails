class AddTitleToPosts < ActiveRecord::Migration
  def change
    change_table(:text_posts) do |t|
      t.string :title
    end
  end
end
