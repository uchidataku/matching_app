class CreateRoomAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :room_accounts, id: :uuid, comment: 'RoomAccount' do |t|
      t.references :room, foreign_key: { on_delete: :cascade }, type: :uuid
      t.references :account, foreign_key: { on_delete: :cascade }, type: :uuid

      t.timestamps
    end
    
    add_index :room_accounts, [:account_id, :room_id], unique: true
  end
end
