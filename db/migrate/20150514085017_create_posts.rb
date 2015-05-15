class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :post_type, null: false
      t.string :title
      t.string :body
      t.string :quote_source
      t.string :quote_author
      t.string :url
      t.integer :parent_id
      t.integer :user_id, null: false
      t.string :blob

      t.timestamps null: false
    end

    add_index(:posts, :user_id)
  end
end
