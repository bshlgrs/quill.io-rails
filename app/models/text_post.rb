class TextPost < ActiveRecord::Base
  has_many :reblogs, as: :rebloggable

  belongs_to :user
end
