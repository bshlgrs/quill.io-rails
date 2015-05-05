class Reblog < ActiveRecord::Base
  has_many :reblogs, as: :rebloggable
  belongs_to :rebloggable, polymorphic: true

end
