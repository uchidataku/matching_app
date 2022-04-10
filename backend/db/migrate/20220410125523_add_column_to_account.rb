class AddColumnToAccount < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :gender, :integer, null: false, default: 0, comment: '性別'
    add_column :accounts, :birthday, :date, comment: '誕生日'
    add_column :accounts, :prefecture, :string, comment: '都道府県'
    add_column :accounts, :introduction, :text, comment: '自己紹介'
  end
end
