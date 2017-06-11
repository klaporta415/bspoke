class Pin < ApplicationRecord

  # def self.buddy
  #   buddy_lat = self.latitude + 0.000001
  #   buddy_long = self.longitude
  # end

  def self.ordered_json
    order("created_at DESC").to_json
  end

end
