class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :text_posts
  has_many :reblogs

  def block_regexes
    @block_regexes ||= self.blocked_words.split(" ").map { |word| /\b#{Regexp.quote(word)}\b/ }
  end

  def block_post?(post)
    self.block_regexes.any? { |regex| regex =~ post.body }
  end

  def interesting_posts
    my_interesting = self.all_posts

    other_interesting = users_followed.flat_map(&:all_posts).reject do |post|
      post.is_private || self.block_post?(post)
    end

    interesting = my_interesting + other_interesting

    interesting.sort_by { |x| -1 * x.created_at.to_i }
  end

  def all_posts
    (self.text_posts + self.reblogs).sort_by(&:created_at)
  end

  def is_following?(other_user)
    UserRelationship.where(:to_user_id => other_user.id, :from_user_id => self.id, :relationship_type => "following").exists?
  end

  def follow(other_user)
    UserRelationship.create!(:to_user_id => other_user.id, :from_user_id => self.id, :relationship_type => "following")
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
    Like.where(:user_id => self.id, :rebloggable_type => post.class.name, :rebloggable_id => post.id).exists?
  end

  def like!(post)
    Like.create!(:user_id => self.id, :rebloggable_type => post.class.name, :rebloggable_id => post.id)
  end
end
