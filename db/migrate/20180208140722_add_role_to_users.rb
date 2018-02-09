class AddRoleToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :role, :string, null: false, default: "member"
    add_column :users, :company_id, :bigint
    add_foreign_key :users, :companies
    add_column :users, :company, :string
  end
end
