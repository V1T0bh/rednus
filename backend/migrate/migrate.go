package main

import (
	"github.com/V1T0bh/rednus/backend/initalizers"
	"github.com/V1T0bh/rednus/backend/models"
)

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	initalizers.DB.AutoMigrate(&models.User{}, &models.Post{}, &models.Topic{})
}
