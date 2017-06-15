class Pin < ApplicationRecord

  def self.ordered_json(avoidance)
    # p avoidance#.include?("everything")
    if avoidance.include?("everything")
      order("created_at DESC").where('expiration_date > ?', Time.now).to_json
    elsif avoidance.include?("nothing")
      [].to_json
    else
    order("created_at DESC").where('expiration_date > ?', Time.now).where(category: avoidance ).to_json
    end
  end

end
