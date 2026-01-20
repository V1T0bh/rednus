package controllers

import (
	"errors"
	"net/http"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
)

func PostsCreate(c *gin.Context) {
	// get data off req body
	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	// Create a post
	// CHANGE USERID AND TOPICID when implemented
	post := models.Post{Title: body.Title, Description: body.Description, UserID: 1, TopicID: 1}

	result := initializers.DB.Create(&post)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, map[string]any{
			"success": false,
			"message": result.Error.Error(),
		})
		c.Error(errors.New("Error creating post"))
		return
	}

	// return with OK 200
	c.JSON(200, gin.H{
		"message": "Post-Created",
		"post":    post,
	})
}

func PostsAll(c *gin.Context) {
	// Get the posts
	var posts []models.Post
	initializers.DB.Find(&posts)

	// Respond with 200 OK and all posts
	c.JSON(200, gin.H{
		"post": posts,
	})
}

func PostsIndex(c *gin.Context) {
	id := c.Param("id")

	var post models.Post
	initializers.DB.First(&post, id)

	c.JSON(200, gin.H{
		"post": post,
	})
}

func PostsUpdate(c *gin.Context) {
	// read, update, save
	id := c.Param("id")

	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	var post models.Post
	initializers.DB.First(&post, id)

	initializers.DB.Model(&post).Updates(models.Post{
		Title:       body.Title,
		Description: body.Description,
	})

	c.JSON(200, gin.H{
		"post": post,
	})
}

func PostsDelete(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Delete(&models.Post{}, id)

	c.Status(200)
}
