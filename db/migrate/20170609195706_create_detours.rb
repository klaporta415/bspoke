class CreateDetours < ActiveRecord::Migration[5.1]
  def change
    create_table :detours do |t|
      t.references :pin
      t.references :way_point

      t.timestamps
    end
  end
end
