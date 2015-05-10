class TextPost < ActiveRecord::Base
  has_many :reblogs, as: :rebloggable

  has_many :likes, as: :rebloggable

  belongs_to :user

  def reblog_descendents
    reblogs.length + reblogs.map(&:reblog_descendents).sum
  end

  def to_builder
    Jbuilder.new do |text_post|
      text_post.(self, :title, :body, :created_at, :updated_at)
      text_post.number_of_likes self.likes.count
    end
  end
end
