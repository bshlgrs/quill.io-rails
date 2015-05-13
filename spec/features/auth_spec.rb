require "rails_helper"
require "spec_helper"

feature "sign up link on dashboard" do
  it "exists" do
    visit "/"
    expect(page).to have_content("Sign up")
    click_on "Sign up"
    expect(page).to have_css('h2', :text => 'Sign up')
  end
end

feature "signing up" do
  it "lets you sign up" do
    visit "/users/sign_up"
    fill_in "Email", with: "test@testy.com"
    fill_in "Username", with: "mr_testman"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password"
    click_button "Sign up"
    expect(page).to have_content("Hey there, mr_testman")
  end

  it "complains if you don't specify a password" do
    visit "/users/sign_up"
    fill_in "Email", with: "test@testy.com"
    fill_in "Username", with: "mr_testman"
    click_button "Sign up"
    expect(page).to_not have_content("Hey there, mr_testman")
  end
end
