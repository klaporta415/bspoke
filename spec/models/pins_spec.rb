require 'rails_helper'

describe Pin do
  let(:pin) { Pin.new(latitude: "41.876393", longitude: "-87.655474", category: "general") }

  describe "attributes" do
   it "has a latitude" do
    expect(pin.latitude).to eq "41.876393"
   end

    it "has a longitude" do
      expect(pin.longitude).to eq "-87.655474"
   end

    it "has a category" do
      expect(pin.category).to eq "general"
   end
 end
end
