class Post < ActiveRecord::Base
  belongs_to :user

  # if it's a reblog
  belongs_to :parent, class_name: "Post"
  has_many :reblogs, -> { where is_private: false, post_status: "active" },
          class_name: "Post", foreign_key: :parent_id

  has_many :image_postings, dependent: :destroy # only if this is an image

  has_many :likes, dependent: :destroy

  has_many :tags, dependent: :destroy

  validate :has_correct_fields
  validates :user, presence: true
  validates :post_status, presence: true

  def get_descendants
    @descendants ||= Set.new([self] + reblogs.flat_map(&:get_descendants))
  end

  def self.top_posts
    Rails.cache.fetch("top posts", expires_in: 1.hour) do
      Post.all.sort_by { |x| -x.number_of_notes }.take(20)
    end.sort_by { |x| -x.number_of_notes }
  end

  def number_of_notes
    self.likes.count + self.number_of_reblog_descendants
  end

  def number_of_reblog_descendants
    reblogs.length + reblogs.map(&:number_of_reblog_descendants).sum
  end

  def reblog_descendants(max_depth, max_branching)
    if max_depth < 0
      raise "invalid state exception"
    elsif max_depth == 0
      return [self]
    else
      [self] + self.reblogs.order(created_at: :asc).limit(max_branching).flat_map do |post|
        post.reblog_descendants(max_depth - 1, max_branching)
      end
    end
  end

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
    self.tags.new(array.uniq.map { |x| {tag: x}})
  end

  # Post types:
  # Text post: has body
  # Quote post: has quote in the body, quote_author, quote_source, url
  # Link post: has url, body
  # Image post: has_many PostImages 
  # reblog: has body, has parent

  def parent_chain
    @chain ||= begin
      chain = []

      post = self.parent
      while post
        chain << post
        post = post.parent
      end

      chain.reverse
    end
  end

  def relevant_posts
    [self] + self.parent_chain + self.reblog_descendants(5, 5)
  end
end
