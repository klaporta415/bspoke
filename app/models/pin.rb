class Pin < ApplicationRecord

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
