class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :username

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :text_posts
  has_many :reblogs

  def is_following?(other_user)
    UserRelationship.where(:to_user.id => other_user, :from_user => self.id, :relationship_type => "following").count == 1
  end

  def follow(other_user)
    UserRelationship.create!(:to_user.id => other_user, :from_user => self.id, :relationship_type => "following")
  end

  def unfollow(other_user)
    UserRelationship.where(:to_user.id => other_user, :from_user => self.id, :relationship_type => "following").delete_all
  end

  def block(other_user)
    UserRelationship.create!(:to_user.id => other_user, :from_user => self.id, :relationship_type => "blocking")
  end

  def unblock(other_user)
    UserRelationship.where(:to_user.id => other_user, :from_user => self.id, :relationship_type => "following").delete_all
  end
end
