class CreateUserRelationships < ActiveRecord::Migration
  def change
    create_table :user_relationships do |t|
      t.integer :from_user
      t.integer :to_user
      t.string :relationship_type

      t.timestamps null: false
    end

    add_index(:user_relationships, :from_user)
    add_index(:user_relationships, :to_user)

    add_index(:users, :username, unique: true)

    add_index(:text_posts, :user_id)
    add_index(:reblogs, :user_id)

    add_index(:reblogs, :rebloggable_id)
    add_index(:reblogs, :rebloggable_type)
  end
end
