class Pin < ApplicationRecord


  def self.ordered_json
    order("created_at DESC").limit(5).to_json
  end

end
