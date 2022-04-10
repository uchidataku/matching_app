class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages, id: :uuid, comment: 'メッセージ' do |t|
      t.references :room, foreign_key: { on_delete: :cascade }, type: :uuid
      t.references :account, foreign_key: { on_delete: :cascade }, type: :uuid

      t.timestamps
    end
  end
end
