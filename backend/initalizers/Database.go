package initalizers

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	// postgresql: //postgres:[YOUR-PASSWORD]@db.gtkesmpfmlaucvddzcnq.supabase.co:5432/postgres
	// DATABASE_URL="postgresql://postgres.gtkesmpfmlaucvddzcnq:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: false,
	})

	if err != nil {
		log.Fatal("Error connecting to database")
	}
}
