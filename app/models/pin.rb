class Pin < ApplicationRecord

  def self.ordered_json(avoidance)
    # p avoidance#.include?("everything")
    if avoidance.include?("everything")
      order("created_at DESC").to_json
    elsif avoidance.include?("nothing")
      [].to_json
    else

      # avoidance.each
      # order("created_at DESC").where(category: ).to_json
    order("created_at DESC").where(category: avoidance ).to_json
    end
  end

end
