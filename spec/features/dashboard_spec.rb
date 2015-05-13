require "rails_helper"
require "spec_helper"

feature "visiting the dashboard" do
  it "has the title" do
    visit "/"
    expect(page).to have_content("quill.io")
  end
end
