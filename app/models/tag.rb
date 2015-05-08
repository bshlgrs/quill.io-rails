class Tag < ActiveRecord::Base
  belongs_to :rebloggable, polymorphic: true
end
