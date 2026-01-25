package initializers

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	// In production environments (like Render), .env file won't exist
	// Environment variables are set by the platform, so we make .env loading optional
	err := godotenv.Load()
	if err != nil {
		// Only log a warning, don't fail - env vars might be set by the platform
		log.Println("Warning: .env file not found, using environment variables from system")

		// Optionally, you can check if critical env vars are set
		if os.Getenv("DB_URL") == "" {
			log.Fatal("Error: DB_URL environment variable is not set")
		}
	}
}
