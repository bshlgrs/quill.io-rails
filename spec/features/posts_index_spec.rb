require "rails_helper"
require "spec_helper"

feature "visiting the posts index" do
  it "rejects you if you're not logged in" do
    visit "/posts"
    expect(page).to have_content("quill.io")
    expect(page).to_not have_content("all your posts")
  end
end
