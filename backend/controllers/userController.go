package controllers

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func SignUp(c *gin.Context) {
	// get username off req body
	var body struct {
		User string
	}

	c.Bind(&body)
	username := body.User

	// create user if doesnt exist
	var user models.User
	user = models.User{Name: username}

	result := initializers.DB.FirstOrCreate(&user, user)

	if result.Error != nil {
		c.Status(400)
		log.Fatal("Error creating user")
		return
	}

	// respond
	if result.RowsAffected == 0 {
		c.JSON(200, gin.H{
			"message": "User-Exists",
			"user":    user,
		})
	} else {
		c.JSON(200, gin.H{
			"message": "User-Created",
			"user":    user,
		})
	}
}

func Login(c *gin.Context) {
	// get username off req body
	var body struct {
		User string
	}

	c.Bind(&body)
	username := body.User
	// look up user
	var user models.User
	result := initializers.DB.First(&user, "name = ?", username)

	// return error if doesnt exist
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "User-Not-Found",
		})
		return
	}

	// create jwt token if exists
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Name,
		"exp": time.Now().Add(300 * time.Second).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Token-Generation-Failed",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 300, "", "", false, true)

	// respond
	c.JSON(200, gin.H{})
}
