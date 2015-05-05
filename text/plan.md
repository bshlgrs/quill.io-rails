Models:

- User
	- name, profile picture, followable, public, allowAnonymousFollowers
	- has_many postables
- TextPost < Postable, Likeable
	- body, repostable, private
	- belongs_to user
- ImagePost < Postable, Likeable
- Reblog < Portable, Likeable
	- body
  - belongs_to parent: Postable
- Like
	- belongs_to Postable
- Tags
  - belongs_to Postable
- Commentable
  - belongs_to Commentable
- UserRelationship
  - fromUser, toUser
  - can be follow, followAnonymously, requestFollow? or block
- Message

Pages:

- show blog
- dashboard: shows things that people you're following have posted
- show followers

make rounded corners