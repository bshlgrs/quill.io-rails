class Post < ActiveRecord::Base
  belongs_to :user

  # if it's a reblog
  belongs_to :parent, class_name: "Post"
  has_many :reblogs, class_name: "Post", foreign_key: :parent_id

  has_many :image_postings, dependent: :destroy # only if this is an image

  has_many :likes, dependent: :destroy

  has_many :tags, dependent: :destroy

  validate :has_correct_fields
  validates :user, presence: true

  def has_correct_fields
    def validate_presence_of(*fields)
      fields.each do |field|
        if self.send(field).nil?
          errors.add(field, "needs to be present")
        end
      end
    end

    case self.post_type
    when nil
      errors.add(:post_type, "must be present")
    when "text_post"
      validate_presence_of(:body)
    when "reblog"
      validate_presence_of(:parent_id)
    end
  end

  def add_tags_from_array(array)
    self.tags.new(array.map { |x| {tag: x}})
  end

  # Post types:
  # Text post: has body
  # Quote post: has quote in the body, quote_author, quote_source, url
  # Link post: has url, body
  # Image post: has_many PostImages 
  # reblog: has body, has parent

  def reblog_descendents
    reblogs.length + reblogs.flat_map(&:reblog_descendants).length
  end

  def parent_chain
    chain = []

    post = self.parent
    while post
      chain << post
      post = post.parent
    end

    chain.reverse
  end
end
