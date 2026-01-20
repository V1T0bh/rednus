package controllers

import (
	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
)

func SignIn(c *gin.Context) {
	// get username off req body
	var body struct {
		User string
	}
	c.Bind(&body)
	username := body.User

	// create user if doesnt exist
	user := models.User{Name: username}
	result := initializers.DB.FirstOrCreate(&user, user)

	if result.Error != nil {
		c.Status(400)
		return
	}

	message := ""
	if result.RowsAffected == 0 {
		message = "User-Exists"
	} else {
		message = "User-Created"
	}

	// respond with username
	c.JSON(200, gin.H{
		"message": message,
		"user":    user,
	})
}

func GetUsers(c *gin.Context) {
	// get all users from db
	var users []models.User
	initializers.DB.Find(&users)

	// respond with users
	c.JSON(200, gin.H{
		"user": users,
	})
}
