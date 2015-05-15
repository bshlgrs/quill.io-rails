class Post < ActiveRecord::Base
  belongs_to :user

  # if it's a reblog
  belongs_to :parent, class_name: "Post"
  has_many :reblogs, class_name: "Post", foreign_key: :parent_id

  has_many :image_postings # only if this is an image

  has_many :tags

  def add_tags_from_array(array)
    self.tags.new(array.map { |x| {tag: x}})
  end

  # Post types:
  # Text post: has body
  # Quote post: has quote in the body, quote_author, quote_source, url
  # Link post: has url, body
  # Image post: has_many PostImages 

  def reblog_descendents
    reblogs.length + reblogs.flat_map(&:reblog_descendants).length
  end
end
