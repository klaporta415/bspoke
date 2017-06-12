require 'rails_helper'

describe Pin do
  let!(:pin) { Pin.create(latitude: "41.876393", longitude: "-87.655474", category: "general") }

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

  describe "self.ordered_json" do
    it "returns empty array when nothing selected" do
      avoidance = "nothing"
      expect(Pin.ordered_json(avoidance)).to eq '[]'
    end

    it "returns pin if everything selected" do
      avoidance = "everything"
      expect(Pin.ordered_json(avoidance)).to eq [pin].to_json
    end

    it "returns empty array when general not selected" do
      avoidance = "goose"
      expect(Pin.ordered_json(avoidance)).to eq '[]'
    end

    it "returns pin if general is selected" do
      avoidance = "general"
      expect(Pin.ordered_json(avoidance)).to eq [pin].to_json
    end

    it "returns empty array when smell selected" do
      avoidance = "smell"
      expect(Pin.ordered_json(avoidance)).to eq '[]'
    end

    it "returns empty array when event selected" do
      avoidance = "event"
      expect(Pin.ordered_json(avoidance)).to eq '[]'
    end

    it "returns empty array when road selected" do
      avoidance = "roadCondition"
      expect(Pin.ordered_json(avoidance)).to eq '[]'
    end
  end
end
