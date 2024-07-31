package routes

import (
	"net/http"

	"github.com/gorilla/handlers"
)

func SetupHandler() (func(http.Handler) http.Handler) {

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"})
	return handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)

}
