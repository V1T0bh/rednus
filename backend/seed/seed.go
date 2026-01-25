package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/V1T0bh/rednus/backend/initializers"
	"github.com/V1T0bh/rednus/backend/models"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
}

func main() {
	fmt.Println("Starting database seeding...")

	// Clear all existing data
	fmt.Println("Clearing existing data...")
	initializers.DB.Exec("DELETE FROM comments")
	initializers.DB.Exec("DELETE FROM posts")
	initializers.DB.Exec("DELETE FROM topics")
	initializers.DB.Exec("DELETE FROM users")
	fmt.Println("✓ All tables cleared")

	// Create users
	fmt.Println("\nCreating users...")
	users := []models.User{
		{Name: "alice", Admin: false},
		{Name: "bob", Admin: false},
		{Name: "charlie", Admin: true},
	}

	for i := range users {
		result := initializers.DB.Create(&users[i])
		if result.Error != nil {
			log.Fatal("Error creating user:", result.Error)
		}
		fmt.Printf("✓ Created user: %s (ID: %d)\n", users[i].Name, users[i].ID)
	}

	// Create exactly 5 topics
	fmt.Println("\nCreating topics...")
	topics := []models.Topic{
		{Label: "General Discussion"},
		{Label: "Technology"},
		{Label: "Sports"},
		{Label: "Food & Cooking"},
		{Label: "Travel"},
	}

	for i := range topics {
		result := initializers.DB.Create(&topics[i])
		if result.Error != nil {
			log.Fatal("Error creating topic:", result.Error)
		}
		fmt.Printf("✓ Created topic: %s (ID: %d)\n", topics[i].Label, topics[i].ID)
	}

	// Initialize random seed
	rand.Seed(time.Now().UnixNano())

	// Post data
	postTitles := []string{
		"Welcome to the community!",
		"What's everyone working on today?",
		"Best practices for beginners",
		"My favorite recipe",
		"Tips for staying productive",
		"How to get started with Go",
		"Amazing experience at the beach",
		"Question about databases",
		"Recommendations needed",
		"Sharing my latest project",
		"Thoughts on the latest update",
		"Help with debugging",
		"Cool new feature idea",
		"My journey so far",
		"Looking for collaborators",
	}

	postContents := []string{
		"This is a great community and I'm excited to be here! Looking forward to connecting with everyone.",
		"I've been learning some new skills lately. Would love to hear what others are up to!",
		"Here are some tips I've learned over the years that might help newcomers get started.",
		"I tried this amazing recipe last week and it turned out great. Highly recommend!",
		"Staying focused can be challenging. Here's what works for me...",
		"Go is an amazing language. Here's how I got started and what helped me learn.",
		"Just got back from an incredible trip. The scenery was absolutely breathtaking!",
		"I'm running into an issue with my database queries. Has anyone experienced this?",
		"Can anyone recommend good resources for learning more about this topic?",
		"I've been working on this for a while and wanted to share it with the community.",
		"What does everyone think about the recent changes? I have mixed feelings.",
		"I can't figure out why my code isn't working. Any suggestions would be appreciated.",
		"I had this idea that could really improve the user experience. What do you think?",
		"It's been quite a journey getting to where I am today. Here's my story...",
		"I'm starting a new project and looking for people interested in collaborating!",
	}

	// Create 1-3 posts per topic
	fmt.Println("\nCreating posts...")
	var posts []models.Post
	titleIndex := 0

	for _, topic := range topics {
		numPosts := rand.Intn(3) + 1 // 1-3 posts per topic
		fmt.Printf("\nTopic '%s' will have %d post(s)\n", topic.Label, numPosts)

		for j := 0; j < numPosts; j++ {
			randomUser := users[rand.Intn(len(users))]

			post := models.Post{
				UserID:      randomUser.ID,
				TopicID:     topic.ID,
				Title:       postTitles[titleIndex%len(postTitles)],
				Description: postContents[titleIndex%len(postContents)],
				AuthorName:  randomUser.Name,
			}

			result := initializers.DB.Create(&post)
			if result.Error != nil {
				log.Fatal("Error creating post:", result.Error)
			}
			posts = append(posts, post)
			fmt.Printf("  ✓ Created post: '%s' by %s\n", post.Title, post.AuthorName)
			titleIndex++
		}
	}

	// Comment data
	commentTexts := []string{
		"Great post! Thanks for sharing.",
		"I completely agree with this.",
		"Interesting perspective!",
		"This is very helpful, thank you!",
		"I have a different opinion on this...",
		"Can you elaborate more on this point?",
		"This worked for me too!",
		"Thanks for the recommendation!",
		"I was just thinking about this yesterday.",
		"Excellent advice!",
		"I learned something new today.",
		"Looking forward to trying this out.",
		"Has anyone else tried this?",
		"This is exactly what I needed!",
		"Good point, I hadn't considered that.",
		"Thanks for taking the time to write this.",
		"Very well explained!",
		"I'm having trouble with this part...",
		"Could you share more details?",
		"This is amazing!",
	}

	// Create 0-3 comments per post
	fmt.Println("\nCreating comments...")
	commentCount := 0
	for _, post := range posts {
		numComments := rand.Intn(4) // 0-3 comments per post

		for i := 0; i < numComments; i++ {
			randomUser := users[rand.Intn(len(users))]
			randomCommentText := commentTexts[rand.Intn(len(commentTexts))]

			comment := models.Comment{
				PostID:     post.ID,
				UserID:     randomUser.ID,
				Content:    randomCommentText,
				AuthorName: randomUser.Name,
			}

			result := initializers.DB.Create(&comment)
			if result.Error != nil {
				log.Fatal("Error creating comment:", result.Error)
			}
			commentCount++
		}

		if numComments > 0 {
			fmt.Printf("  ✓ Added %d comment(s) to post '%s'\n", numComments, post.Title)
		}
	}

	fmt.Println("\n✅ Database seeding completed successfully!")
	fmt.Printf("\nSummary:\n")
	fmt.Printf("  - Users: %d (alice, bob, charlie)\n", len(users))
	fmt.Printf("  - Topics: %d\n", len(topics))
	fmt.Printf("  - Posts: %d (1-3 per topic)\n", len(posts))
	fmt.Printf("  - Comments: %d (0-3 per post)\n", commentCount)
}
