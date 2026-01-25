package main

import (
	"github.com/V1T0bh/rednus/backend/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() {
	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Username")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Topics routes
	router.POST("/topics", controllers.TopicsCreate)
	router.GET("/topics", controllers.TopicsAll)
	router.GET("/topics/:topic_id", controllers.TopicsIndex)
	router.PUT("/topics/:topic_id", controllers.TopicsUpdate)
	router.DELETE("/topics/:topic_id", controllers.TopicsDelete)

	// Posts routes
	router.POST("/posts", controllers.PostsCreate)
	router.POST("/topics/:topic_id/posts/", controllers.PostsCreateinTopic)
	router.GET("/posts", controllers.PostsAll)
	router.GET("/topics/:topic_id/posts", controllers.PostsAllinTopic)
	router.GET("/posts/:post_id", controllers.PostsIndex)
	router.PUT("/posts/:post_id", controllers.PostsUpdate)
	router.DELETE("/posts/:post_id", controllers.PostsDelete)

	// Comments routes
	router.POST("/posts/:post_id/comments", controllers.CommentsCreate)
	router.GET("/posts/:post_id/comments", controllers.CommentsAllInPost)
	router.PUT("/comments/:id", controllers.CommentsUpdate)
	router.DELETE("/comments/:id", controllers.CommentsDelete)

	// User routes
	router.POST("/signin", controllers.SignIn)
	router.GET("/users", controllers.GetUsers)
}
