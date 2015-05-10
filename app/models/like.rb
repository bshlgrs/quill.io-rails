class Like < ActiveRecord::Base
  def self.likes_count(post)
    Like.where(rebloggable_type: post.class.name,
      rebloggable_id: post.id).count
  end

  belongs_to :rebloggable, polymorphic: true
  belongs_to :user
end
