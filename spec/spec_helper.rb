
RSpec.configure do |config|
 
  config.expect_with :rspec do |expectations|
    
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

end

def populate_data
  buck = User.create!(username: "Buck", email: "bshlegeris@gmail.com", password: "whatever", is_admin: true)
  Post.create!(user_id: buck.id, title: "First post", body: "is disappointing", post_type: "text_post")
end