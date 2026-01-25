package controllers

import (
	"net/http"
	"strings"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/middleware"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPassword compares a password with a hash
func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func SignIn(c *gin.Context) {
	var body struct {
		User     string
		Password string
	}
	c.Bind(&body)

	username := strings.ToLower(body.User)

	// Find user
	var user models.User
	result := initializers.DB.Where("name = ?", username).First(&user)

	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid username or password",
		})
		return
	}

	// Check password
	if !CheckPassword(body.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid username or password",
		})
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateToken(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to generate token",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Login successful",
		"token":   token,
		"user": gin.H{
			"ID":        user.ID,
			"Name":      user.Name,
			"Admin":     user.Admin,
			"CreatedAt": user.CreatedAt,
			"UpdatedAt": user.UpdatedAt,
		},
	})
}

func SignUp(c *gin.Context) {
	var body struct {
		User     string
		Password string
	}
	c.Bind(&body)

	username := strings.ToLower(body.User)

	if len(username) < 3 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Username must be at least 3 characters",
		})
		return
	}

	if len(body.Password) < 6 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Password must be at least 6 characters",
		})
		return
	}

	// Check if user already exists
	var existingUser models.User
	result := initializers.DB.Where("name = ?", username).First(&existingUser)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{
			"success": false,
			"message": "Username already taken",
		})
		return
	}

	// Hash password
	hashedPassword, err := HashPassword(body.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to process password",
		})
		return
	}

	// Create user
	user := models.User{
		Name:     username,
		Password: hashedPassword,
		Admin:    false,
	}

	result = initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create user",
		})
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateToken(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to generate token",
		})
		return
	}

	c.JSON(201, gin.H{
		"message": "User created successfully",
		"token":   token,
		"user": gin.H{
			"ID":        user.ID,
			"Name":      user.Name,
			"Admin":     user.Admin,
			"CreatedAt": user.CreatedAt,
			"UpdatedAt": user.UpdatedAt,
		},
	})
}

func ChangePassword(c *gin.Context) {
	user, exists := middleware.GetUserFromContext(c)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "User not found",
		})
		return
	}

	var body struct {
		CurrentPassword string
		NewPassword     string
	}
	c.Bind(&body)

	// Verify current password
	if !CheckPassword(body.CurrentPassword, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Current password is incorrect",
		})
		return
	}

	if len(body.NewPassword) < 6 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "New password must be at least 6 characters",
		})
		return
	}

	// Hash new password
	hashedPassword, err := HashPassword(body.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to process password",
		})
		return
	}

	// Update password
	initializers.DB.Model(user).Update("password", hashedPassword)

	c.JSON(200, gin.H{
		"success": true,
		"message": "Password changed successfully",
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	initializers.DB.Find(&users)

	c.JSON(200, gin.H{
		"user": users,
	})
}
