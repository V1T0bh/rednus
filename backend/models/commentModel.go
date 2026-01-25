package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	PostID     uint
	UserID     uint
	Content    string
	AuthorName string
}
