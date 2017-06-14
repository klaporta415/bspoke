class Pin < ApplicationRecord

  def self.ordered_json(avoidance)

    p avoidance
    # p avoidance#.include?("everything")
    if avoidance.include?("everything")
      order("created_at DESC").to_json
    elsif avoidance.include?("nothing")
      [].to_json
    else
      # p order("created_at DESC").where(category: avoidance).count
      # avoidance.each
      # order("created_at DESC").where(category: ).to_json
    order("created_at DESC").where(category: avoidance).to_json
    end
  end

end
