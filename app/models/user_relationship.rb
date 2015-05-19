class UserRelationship < ActiveRecord::Base
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"

  # relationship_type

  # user relationship should be "following" or "blocked"
end
