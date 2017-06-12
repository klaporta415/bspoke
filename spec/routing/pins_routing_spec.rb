require "rails_helper"

RSpec.describe "Routing for pins", :type => :routing do
  it "POST /pins/create routes to pins#create" do
    expect(:post => "/pins").to route_to("pins#create")
  end

  it "GET /pins/new routes to pins#new" do
    expect(:get => "/pins/new").to route_to("pins#new")
  end

  it "GET /pins/index routes to pins#index" do
    expect(:get => "/pins").to route_to("pins#index")
  end
end
