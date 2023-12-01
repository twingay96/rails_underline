class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :content
      t.references :category, null: true, foreign_key: true
      t.timestamps
    end
  end
end
