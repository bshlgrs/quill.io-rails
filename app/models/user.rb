class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :text_posts
  has_many :reblogs

  def interesting_posts
    interesting = (self.text_posts + 
                  self.reblogs +
                  users_followed.flat_map { |x| x.text_posts.where(:private => false) } + 
                  users_followed.flat_map { |x| x.reblogs.where(:private => false) })

    interesting.sort_by { |x| -1 * x.created_at.to_i }
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
