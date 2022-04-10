class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes, id: :uuid, comment: 'いいね' do |t|
      t.references :from_account, foreign_key: { to_table: :accounts }, type: :uuid
      t.references :to_account, foreign_key: { to_table: :accounts }, type: :uuid

      t.timestamps
    end
  end
end
