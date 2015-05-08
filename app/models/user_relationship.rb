class UserRelationship < ActiveRecord::Base
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"

  # user relationship should be "following" or "blocked"
end
