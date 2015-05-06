class Reblog < ActiveRecord::Base
  has_many :reblogs, as: :rebloggable
  belongs_to :rebloggable, polymorphic: true
  belongs_to :user

  def reblog_descendents
    reblogs.length + reblogs.map(&:reblog_descendents).sum
  end
end
