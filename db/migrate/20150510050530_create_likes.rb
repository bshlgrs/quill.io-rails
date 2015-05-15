class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :rebloggable_id, null: false
      t.string :rebloggable_type, null: false

      t.timestamps null: false
    end

    add_index(:likes, :user_id)
    add_index(:likes, :rebloggable_id)
  end
end
