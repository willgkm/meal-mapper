package main

import (
	"log"
	"meal-mapper/database"
	"meal-mapper/routes"
	"net/http"
)

var PORT = ":8910"

func main() {

	database.Connect()

	r := routes.SetupRouter()
	h := routes.SetupHandler()

	log.Println("Server is running on port http://localhost" + (PORT))
	log.Fatal(http.ListenAndServe(PORT, (h)(r)))
}
