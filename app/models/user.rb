class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  has_many :posts

  has_many :active_posts,
            -> { where post_status: "active" },
            class_name: "Post",
            foreign_key: "user_id"

  has_many :publicly_visible_posts,
            -> { where post_status: "active", is_private: false },
            class_name: "Post",
            foreign_key: "user_id"            

  has_many :drafts,
            -> { where post_status: "draft" },
            class_name: "Post",
            foreign_key: "user_id"

  has_many :outgoing_user_relationships, class_name: "UserRelationship", foreign_key: "from_user_id"
  has_many :outgoing_follows,
              -> { where relationship_type: "following" },
              class_name: "UserRelationship",
              foreign_key: "from_user_id"

  has_many :followed_users, through: :outgoing_follows, source: :to_user
  has_many :posts_by_followed_users, -> { where is_private: false, post_status: "active" },
              through: :followed_users,
              source: :posts

  has_many :incoming_follows,
              -> { where relationship_type: "following" },
              class_name: "UserRelationship",
              foreign_key: "to_user_id"
  has_many :followers, through: :incoming_follows, source: :from_user

  has_many :likes
  has_many :liked_posts, through: :likes, source: :post

  validates_uniqueness_of :username
  validates_uniqueness_of :email
  validate :name_is_acceptable

  def self.top_users
    Rails.cache.fetch("top users 2", expires_in: 10.minutes) do
      User.all.includes(:incoming_follows).sort_by { |x| - x.incoming_follows.count }.take(10)
    end.sort_by { |x| - x.incoming_follows.count }
  end

  def name_is_acceptable
    if self.username.include?(".")
      errors.add(:username, "Not allowed periods in usernames")
    end
  end

  def interesting_posts
    # todo: fix this monstrosity
    interesting = (posts_by_followed_users + self.active_posts).sort_by { |x| x.created_at.to_i * -1}
  end

  def is_interested_in_post?(post)
    self.is_following?(post.user) || post.user == self
  end

  def block_regexes
    @block_regexes ||= self.blocked_words.split(" ").map { |word| /\b#{Regexp.quote(word)}\b/ }
  end

  def block_post?(post)
    self.block_regexes.any? { |regex| regex =~ post.body } && post.user_id != self.id
  end

  def is_following?(other_user)
    @following_cache ||= {}
    @following_cache[other_user.id] ||= followed_users.where(:id => other_user.id).present?
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

  def users_followed
    UserRelationship.where(
      :from_user_id => self.id,
      :relationship_type => "following"
    ).map { |x| x.to_user }
  end

  def likes?(post)
    liked_posts.include? post
  end

  def like!(post)
    Like.create!(:user_id => self.id, :rebloggable_type => post.class.name, :rebloggable_id => post.id)
  end

  def guaranteed_profile_pic_url
    profile_pic_url && profile_pic_url != "" || "//robohash.org/#{self.username}.png?size=200x200"
  end
end
