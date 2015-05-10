class UserPreferences < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :blocked_words, null: false, default: ""
      
    end
  end
end
