package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string `gorm:"unique"`
	Password string `json:"-"` // Never expose password in JSON responses
	Admin    bool   `gorm:"default:false"`
}
