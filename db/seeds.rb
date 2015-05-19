# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

50.times do
  name = Faker::Name.name
  User.new(:username => Faker::Internet.user_name(name), 
    :email => Faker::Internet.email(name),
    :password => "password").save
end

1000.times do 
  Post.new(:title => Faker::Company.catch_phrase, :user_id => User.all.sample.id, :body => Faker::Lorem.paragraph,
    :is_rebloggable => Random.rand > 0.5, :is_private => Random.rand > 0.9, post_type: "text_post").save!
end