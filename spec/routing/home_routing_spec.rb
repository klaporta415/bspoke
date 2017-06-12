require "rails_helper"

RSpec.describe "Routing to the application", :type => :routing do
  it "GET / routes to home#index" do
    expect(:get => "/").to route_to("home#index")
  end

  it "GET /home/map routes to home#map" do
    expect(:get => "/home/map").to route_to("home#map")
  end
end
