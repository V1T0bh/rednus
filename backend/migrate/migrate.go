package main

import (
	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{}, &models.Post{}, &models.Topic{})
}
