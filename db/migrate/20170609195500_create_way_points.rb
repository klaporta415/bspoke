class CreateWayPoints < ActiveRecord::Migration[5.1]
  def change
    create_table :way_points do |t|
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
