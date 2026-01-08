package main

import (
	"github.com/V1T0bh/rednus/backend/initalizers"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine = gin.Default()

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	SetupRoutes()

	router.Run() // listens on 0.0.0.0:8080 by default
}
