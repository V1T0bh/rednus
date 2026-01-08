package main

import (
	"github.com/V1T0bh/rednus/backend/initalizers"
	"github.com/gin-gonic/gin"
)

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run() // listens on 0.0.0.0:8080 by default
}
