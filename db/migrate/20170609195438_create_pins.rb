class CreatePins < ActiveRecord::Migration[5.1]
  def change
    create_table :pins do |t|
      t.string :latitude
      t.string :longitude
      t.string :category
      t.datetime :expiration_date

      t.timestamps
    end
  end
end
