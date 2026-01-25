package main

import (
	"github.com/V1T0bh/rednus/backend/controllers"
	"github.com/V1T0bh/rednus/backend/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() {
	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Public routes (no auth required)
	router.POST("/signin", controllers.SignIn)
	router.POST("/signup", controllers.SignUp)
	router.GET("/users", controllers.GetUsers)

	// Public read routes
	router.GET("/topics", controllers.TopicsAll)
	router.GET("/topics/:topic_id", controllers.TopicsIndex)
	router.GET("/posts", controllers.PostsAll)
	router.GET("/topics/:topic_id/posts", controllers.PostsAllinTopic)
	router.GET("/posts/:post_id", controllers.PostsIndex)
	router.GET("/posts/:post_id/comments", controllers.CommentsAllInPost)

	// Protected routes (JWT auth required)
	protected := router.Group("/")
	protected.Use(middleware.JWTAuthMiddleware())
	{
		// Topics routes (protected)
		protected.POST("/topics", controllers.TopicsCreate)
		protected.PUT("/topics/:topic_id", controllers.TopicsUpdate)
		protected.DELETE("/topics/:topic_id", controllers.TopicsDelete)

		// Posts routes (protected)
		protected.POST("/posts", controllers.PostsCreate)
		protected.POST("/topics/:topic_id/posts/", controllers.PostsCreateinTopic)
		protected.PUT("/posts/:post_id", controllers.PostsUpdate)
		protected.DELETE("/posts/:post_id", controllers.PostsDelete)

		// Comments routes (protected)
		protected.POST("/posts/:post_id/comments", controllers.CommentsCreate)
		protected.PUT("/comments/:id", controllers.CommentsUpdate)
		protected.DELETE("/comments/:id", controllers.CommentsDelete)

		// User routes (protected)
		protected.PUT("/users/password", controllers.ChangePassword)
	}
}
