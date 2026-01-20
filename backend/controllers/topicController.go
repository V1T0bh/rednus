package controllers

import (
	"errors"
	"net/http"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
	"github.com/gin-gonic/gin"
)

func TopicsCreate(c *gin.Context) {
	// get data off req body
	var body struct {
		Label string
	}

	// create topics variable/model
	// create topic in db
	c.Bind(&body)
	topic := models.Topic{Label: body.Label}

	result := initializers.DB.Create(&topic)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, map[string]any{
			"success": false,
			"message": result.Error.Error(),
		})
		c.Error(errors.New("Error creating topic"))
		return
	}

	// respond with 200 OK
	c.JSON(200, gin.H{
		"message": "Topic-Created",
		"topic":   topic,
	})
}

func TopicsAll(c *gin.Context) {
	// Get the topics
	var topics []models.Topic
	initializers.DB.Find(&topics)

	// Respond with 200 OK and all topics
	c.JSON(200, gin.H{
		"topics": topics,
	})
}

func TopicsUpdate(c *gin.Context) {
	// get data off req body
	id := c.Param("id")
	var body struct {
		Label string
	}
	c.Bind(&body)

	// get topic from id
	var topic models.Topic
	initializers.DB.First(&topic, id)

	// update topic in db
	initializers.DB.Model(&topic).Updates(models.Topic{
		Label: body.Label,
	})

	// respond with 200 OK
	c.JSON(200, gin.H{
		"message": "Topic-Created",
		"topic":   topic,
	})
}

func TopicsDelete(c *gin.Context) {
	// get topic from id
	id := c.Param("id")

	// delete topic in db
	initializers.DB.Delete(&models.Topic{}, id)

	// respond with 200 OK
	c.JSON(200, gin.H{
		"message": "Topic-Deleted",
	})
}
