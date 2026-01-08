package main

import "github.com/V1T0bh/rednus/backend/controllers"

func SetupRoutes() {
	// Define your routes here
	router.POST("/posts", controllers.PostsCreate)
	router.GET("/posts", controllers.PostsAll)
	router.GET("/posts/:id", controllers.PostsIndex)
	router.PUT("/posts/:id", controllers.PostsUpdate)
	router.DELETE("/posts/:id", controllers.PostsDelete)
}
