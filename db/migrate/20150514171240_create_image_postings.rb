class CreateImagePostings < ActiveRecord::Migration
  def change
    create_table :image_postings do |t|
      t.string :caption
      t.integer :post_id, null: false

      t.timestamps null: false
    end
  end
end
