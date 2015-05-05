class CreateTextPosts < ActiveRecord::Migration
  def change
    create_table :text_posts do |t|
      t.string :body, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
