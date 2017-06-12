class Pin < ApplicationRecord

  # def self.buddy
  #   buddy_lat = self.latitude + 0.000001
  #   buddy_long = self.longitude
  # end

  def self.ordered_json(avoidance)
    if avoidance == "everything"
      order("created_at DESC").to_json
    elsif avoidance == "nothing"
      [].to_json
    else
      order("created_at DESC").where(category: avoidance).to_json
    end
  end

end
