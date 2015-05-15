class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :posts

  has_many :outgoing_user_relationships, class_name: "UserRelationship", foreign_key: "from_user_id"
  has_many :outgoing_follows,
              -> { where relationship_type: "following" },
              class_name: "UserRelationship",
              foreign_key: "from_user_id"
  has_many :followed_users, through: :outgoing_follows, source: :to_user

  def interesting_posts
    # todo: fix this monstrosity
    interesting = (followed_users.joins(:posts) + self.posts).sort_by { |x| 0 - x.created_at }
  end

  def is_following?(other_user)
    followed_users.where(:id => other_user.id).present?
  end

  def follow(other_user)
    unless self.is_following? other_user
      UserRelationship.create!(:to_user_id => other_user.id,
                               :from_user_id => self.id,
                               :relationship_type => "following")
    end
  end

  def unfollow(other_user)
    UserRelationship.where(:to_user_id => other_user.id, :from_user_id => self.id, :relationship_type => "following").delete_all
  end

  def block(other_user)
    UserRelationship.create!(:to_user_id => other_user.id, :from_user_id => self.id, :relationship_type => "blocking")
  end

  def unblock(other_user)
    UserRelationship.where(:to_user_id => other_user.id, :from_user_id => self.id, :relationship_type => "following").delete_all
  end
end
