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
  has_many :posts_by_followed_users, -> { where is_private: false },
              through: :followed_users,
              source: :posts

  has_many :likes
  has_many :liked_posts, through: :likes, source: :post

  validates_uniqueness_of :username
  validates_uniqueness_of :email
  validate :name_is_acceptable

  def name_is_acceptable
    if self.username.include?(".")
      errors.add(:username, "Not allowed periods in usernames")
    end
  end

  def interesting_posts
    # todo: fix this monstrosity
    interesting = (posts_by_followed_users + self.posts).sort_by { |x| x.created_at.to_i * -1}
  end

  def block_regexes
    @block_regexes ||= self.blocked_words.split(" ").map { |word| /\b#{Regexp.quote(word)}\b/ }
  end

  def block_post?(post)
    self.block_regexes.any? { |regex| regex =~ post.body } && post.user_id != self.id
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
    profile_pic_url && profile_pic_url != "" || "http://robohash.org/#{self.username}.png?size=200x200"
  end
end
