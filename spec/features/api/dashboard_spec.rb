require "rails_helper"
require "spec_helper"

feature "dashboard api" do
  it "works when empty" do
    visit "/api/dashboard"
  end

  it "works when non-empty" do
    populate_data

    visit "/api/dashboard"
  end
end
