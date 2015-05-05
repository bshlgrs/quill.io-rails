class CreateReblogs < ActiveRecord::Migration
  def change
    create_table :reblogs do |t|
      t.integer :user_id, null: false
      t.integer :rebloggable_id, null: false
      t.string :rebloggable_type, null: false
      t.string :body

      t.timestamps null: false
    end
  end
end
