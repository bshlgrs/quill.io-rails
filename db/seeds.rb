# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

50.times do
  User.new(:username => Faker::Internet.user_name, 
    :email => Faker::Internet.email,
    :password => "password").save
end

1000.times do 
  TextPost.new(:title => Faker::Company.catch_phrase, :user_id => User.all.sample.id, :body => Faker::Lorem.paragraph,
    :is_rebloggable => Random.rand > 0.5, :is_private => Random.rand > 0.9).save!
end