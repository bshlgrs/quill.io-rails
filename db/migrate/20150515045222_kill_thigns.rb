class KillThigns < ActiveRecord::Migration
  def change
    drop_table :text_posts
    drop_table :reblogs
  end
end
