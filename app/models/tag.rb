class Tag < ActiveRecord::Base
  validates :post, presence: true
  belongs_to :post, dependent: :destroy
end
