package main

import "github.com/V1T0bh/rednus/backend/controllers"

func SetupRoutes() {
	// Define your routes here
	router.POST("/posts", controllers.PostsCreate)
	router.GET("/posts", controllers.PostsAll)
	router.GET("/posts/:id", controllers.PostsIndex)
	router.PUT("/posts/:id", controllers.PostsUpdate)
	router.DELETE("/posts/:id", controllers.PostsDelete)

	router.POST("/topics", controllers.TopicsCreate)
	router.GET("/topics", controllers.TopicsAll)
	router.PUT("/topics/:id", controllers.TopicsUpdate)
	router.DELETE("/topics/:id", controllers.TopicsDelete)

	router.POST("/signup", controllers.SignUp)
	router.POST("/login", controllers.Login)
}
