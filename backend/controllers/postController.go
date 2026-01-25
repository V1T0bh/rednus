package controllers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"

	"strconv"
)

func parseStringToUint(s string) uint {
	i, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return 0
	}
	return uint(i)
}

// getUserFromHeader extracts username from X-Username header and returns the user
func getUserFromHeader(c *gin.Context) (*models.User, error) {
	username := c.GetHeader("X-Username")
	if username == "" {
		return nil, errors.New("X-Username header is required")
	}

	username = strings.ToLower(username)
	var user models.User
	result := initializers.DB.Where("name = ?", username).First(&user)
	if result.Error != nil {
		return nil, errors.New("user not found")
	}

	return &user, nil
}

func PostsCreate(c *gin.Context) {
	// Get user from header
	user, err := getUserFromHeader(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	// get data off req body
	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	// Create a post with authenticated user
	post := models.Post{
		Title:       body.Title,
		Description: body.Description,
		UserID:      user.ID,
		TopicID:     1,
		AuthorName:  user.Name,
	}

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

func PostsCreateinTopic(c *gin.Context) {
	// Get user from header
	user, err := getUserFromHeader(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	// same thing as PostsCreate but get topic ID
	topicID := c.Param("topic_id")

	// get data off req body
	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	// Create a post with authenticated user
	post := models.Post{
		Title:       body.Title,
		Description: body.Description,
		UserID:      user.ID,
		TopicID:     uint(parseStringToUint(topicID)),
		AuthorName:  user.Name,
	}

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

func PostsAllinTopic(c *gin.Context) {
	// Get the topic ID from params
	topicID := c.Param("topic_id")

	// Get the posts
	var posts []models.Post
	initializers.DB.Where("topic_id = ?", topicID).Find(&posts)

	// Respond with 200 OK and all posts
	c.JSON(200, gin.H{
		"post": posts,
	})
}

func PostsIndex(c *gin.Context) {
	postID := c.Param("post_id")

	var post models.Post
	initializers.DB.First(&post, postID)

	c.JSON(200, gin.H{
		"post": post,
	})
}

func PostsUpdate(c *gin.Context) {
	// Get user from header
	user, err := getUserFromHeader(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	// read, update, save
	postID := c.Param("post_id")

	var body struct {
		Title       string
		Description string
	}

	c.Bind(&body)

	var post models.Post
	initializers.DB.First(&post, postID)

	// Check if user is the author or an admin
	if post.UserID != user.ID && !user.Admin {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "You can only edit your own posts",
		})
		return
	}

	initializers.DB.Model(&post).Updates(models.Post{
		Title:       body.Title,
		Description: body.Description,
	})

	c.JSON(200, gin.H{
		"post": post,
	})
}

func PostsDelete(c *gin.Context) {
	// Get user from header
	user, err := getUserFromHeader(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	postID := c.Param("post_id")

	var post models.Post
	initializers.DB.First(&post, postID)

	// Check if user is the author or an admin
	if post.UserID != user.ID && !user.Admin {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "You can only delete your own posts",
		})
		return
	}

	initializers.DB.Delete(&models.Post{}, postID)

	c.JSON(200, gin.H{
		"message": "Post-Deleted",
	})
}
