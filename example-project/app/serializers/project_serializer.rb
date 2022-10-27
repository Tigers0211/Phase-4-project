class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :thumbnail, :red, :green, :blue

  has_many :users
  has_many :images
  has_many :user_projects
end
