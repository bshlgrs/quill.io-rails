# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150525225658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "image_postings", force: :cascade do |t|
    t.string   "caption"
    t.integer  "post_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "post_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["post_id"], name: "index_likes_on_post_id", using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "post_type",                         null: false
    t.string   "title"
    t.string   "body"
    t.string   "quote_source"
    t.string   "quote_author"
    t.string   "url"
    t.integer  "parent_id"
    t.integer  "user_id",                           null: false
    t.string   "blob"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.boolean  "is_private",     default: false,    null: false
    t.boolean  "is_rebloggable", default: false,    null: false
    t.integer  "asker_id"
    t.string   "post_status",    default: "active", null: false
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "tag",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "post_id",    null: false
  end

  create_table "user_relationships", force: :cascade do |t|
    t.integer  "from_user_id",      null: false
    t.integer  "to_user_id",        null: false
    t.string   "relationship_type", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "user_relationships", ["from_user_id"], name: "index_user_relationships_on_from_user_id", using: :btree
  add_index "user_relationships", ["to_user_id"], name: "index_user_relationships_on_to_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "username",                     default: "",    null: false
    t.string   "email",                        default: "",    null: false
    t.string   "encrypted_password",           default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.boolean  "is_admin",                     default: false, null: false
    t.string   "blocked_words",                default: "",    null: false
    t.string   "profile_pic_url"
    t.string   "description",                  default: "",    null: false
    t.boolean  "require_permission_to_follow", default: false, null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
