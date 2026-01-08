package main

import (
	"github.com/V1T0bh/rednus/backend/controllers"
	"github.com/V1T0bh/rednus/backend/initalizers"
	"github.com/gin-gonic/gin"
)

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	router := gin.Default()
	// router.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "Post-Created",
	// 	})
	// })

	// Post routes
	router.POST("/posts", controllers.PostsCreate)
	router.GET("/posts", controllers.PostsAll)
	router.GET("/posts/:id", controllers.PostsIndex)
	router.PUT("/posts/:id", controllers.PostsUpdate)
	router.DELETE("/posts/:id", controllers.PostsDelete)

	router.Run() // listens on 0.0.0.0:8080 by default
}
