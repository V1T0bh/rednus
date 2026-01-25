package controllers

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/middleware"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
)

// getUserFromContextComment gets the authenticated user from JWT context
func getUserFromContextComment(c *gin.Context) (*models.User, error) {
	user, exists := middleware.GetUserFromContext(c)
	if !exists {
		return nil, errors.New("user not authenticated")
	}
	return user, nil
}

func CommentsCreate(c *gin.Context) {
	// Get user from header
	user, err := getUserFromContextComment(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	postID := c.Param("post_id")

	var body struct {
		Content string
	}

	c.Bind(&body)

	// Create a comment with authenticated user
	comment := models.Comment{
		Content:    body.Content,
		UserID:     user.ID,
		PostID:     parseStringToUintComment(postID),
		AuthorName: user.Name,
	}

	result := initializers.DB.Create(&comment)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, map[string]any{
			"success": false,
			"message": result.Error.Error(),
		})
		c.Error(errors.New("error creating comment"))
		return
	}

	c.JSON(200, gin.H{
		"message": "Comment-Created",
		"comment": comment,
	})
}

func CommentsAllInPost(c *gin.Context) {
	postID := c.Param("post_id")

	var comments []models.Comment
	initializers.DB.Where("post_id = ?", postID).Find(&comments)

	c.JSON(200, gin.H{
		"comments": comments,
	})
}

func CommentsUpdate(c *gin.Context) {
	// Get user from header
	user, err := getUserFromContextComment(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	id := c.Param("id")

	var body struct {
		Content string
	}

	c.Bind(&body)

	var comment models.Comment
	result := initializers.DB.First(&comment, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Comment not found",
		})
		return
	}

	// Check if user is the author or an admin
	if comment.UserID != user.ID && !user.Admin {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "You can only edit your own comments",
		})
		return
	}

	// Update the comment
	initializers.DB.Model(&comment).Updates(models.Comment{
		Content: body.Content,
	})

	c.JSON(200, gin.H{
		"message": "Comment-Updated",
		"comment": comment,
	})
}

func CommentsDelete(c *gin.Context) {
	// Get user from header
	user, err := getUserFromContextComment(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	id := c.Param("id")

	var comment models.Comment
	result := initializers.DB.First(&comment, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Comment not found",
		})
		return
	}

	// Check if user is the author or an admin
	if comment.UserID != user.ID && !user.Admin {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "You can only delete your own comments",
		})
		return
	}

	initializers.DB.Delete(&models.Comment{}, id)

	c.JSON(200, gin.H{
		"message": "Comment-Deleted",
	})
}

func parseStringToUintComment(s string) uint {
	i, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return 0
	}
	return uint(i)
}
