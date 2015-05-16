require "rails_helper"
require "spec_helper"

feature "visiting the dashboard" do
  it "has the title" do
    visit "/"
    expect(page).to have_content("quill.io")
  end

  it "shows existing posts" do
    populate_data

    visit "/"

    expect(page).to have_content("quill.io")
    expect(page).to have_content("First post")
    expect(page).to have_content("is disappointing")
    expect(page).to have_content("Buck")
  end
end
