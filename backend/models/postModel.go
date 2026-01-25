package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	UserID      uint
	TopicID     uint
	Title       string
	Description string
	AuthorName  string
}
