class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag, null: false
      t.integer :rebloggable_id, null: false
      t.string :rebloggable_type, null: false

      t.timestamps null: false
    end
  end
end
