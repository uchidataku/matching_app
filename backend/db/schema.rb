# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_10_154239) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "accounts", id: :uuid, default: -> { "gen_random_uuid()" }, comment: "アカウント", force: :cascade do |t|
    t.string "email", null: false, comment: "メールアドレス"
    t.string "password_digest", null: false, comment: "パスワードのハッシュ値"
    t.string "username", null: false, comment: "ユーザーネーム"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "gender", default: 0, null: false, comment: "性別"
    t.date "birthday", comment: "誕生日"
    t.string "prefecture", comment: "都道府県"
    t.text "introduction", comment: "自己紹介"
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["username"], name: "index_accounts_on_username", unique: true
  end

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "likes", id: :uuid, default: -> { "gen_random_uuid()" }, comment: "いいね", force: :cascade do |t|
    t.uuid "from_account_id"
    t.uuid "to_account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["from_account_id"], name: "index_likes_on_from_account_id"
    t.index ["to_account_id"], name: "index_likes_on_to_account_id"
  end

  create_table "messages", id: :uuid, default: -> { "gen_random_uuid()" }, comment: "メッセージ", force: :cascade do |t|
    t.uuid "room_id"
    t.uuid "account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id"], name: "index_messages_on_account_id"
    t.index ["room_id"], name: "index_messages_on_room_id"
  end

  create_table "room_accounts", id: :uuid, default: -> { "gen_random_uuid()" }, comment: "RoomAccount", force: :cascade do |t|
    t.uuid "room_id"
    t.uuid "account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id", "room_id"], name: "index_room_accounts_on_account_id_and_room_id", unique: true
    t.index ["account_id"], name: "index_room_accounts_on_account_id"
    t.index ["room_id"], name: "index_room_accounts_on_room_id"
  end

  create_table "rooms", id: :uuid, default: -> { "gen_random_uuid()" }, comment: "トークルーム", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "likes", "accounts", column: "from_account_id", on_delete: :cascade
  add_foreign_key "likes", "accounts", column: "to_account_id", on_delete: :cascade
  add_foreign_key "messages", "accounts", on_delete: :cascade
  add_foreign_key "messages", "rooms", on_delete: :cascade
  add_foreign_key "room_accounts", "accounts", on_delete: :cascade
  add_foreign_key "room_accounts", "rooms", on_delete: :cascade
end
