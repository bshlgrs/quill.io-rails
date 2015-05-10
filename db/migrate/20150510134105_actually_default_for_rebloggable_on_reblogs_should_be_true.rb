class ActuallyDefaultForRebloggableOnReblogsShouldBeTrue < ActiveRecord::Migration
  def change
    change_column :reblogs, :is_rebloggable, :boolean, null: false, default: true
  end
end
