class AddUniqueIndexToLike < ActiveRecord::Migration[6.1]
  def change
    add_index :likes, [:from_account_id, :to_account_id], unique: true
  end
end
