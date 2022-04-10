class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms, id: :uuid, comment: 'トークルーム' do |t|
      t.timestamps
    end
  end
end
