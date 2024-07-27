package routes

import (
	"meal-mapper/controllers"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	router.Use(loggingMiddleware)
	router.HandleFunc("/food", controllers.CreateFood).Methods("POST")
	router.HandleFunc("/food", controllers.GetFoods).Methods("GET")
	router.HandleFunc("/food/{id:[0-9]+}", controllers.GetFoodById).Methods("GET")
	router.HandleFunc("/food/{id:[0-9]+}", controllers.DeleteFoodById).Methods("DELETE")
	router.HandleFunc("/food/{id:[0-9]+}", controllers.UpdateFoodById).Methods("PUT")

	return router
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		lrw := &loggingResponseWriter{w, http.StatusOK}

		logrus.WithFields(logrus.Fields{
			"method": r.Method,
			"url":    r.URL.Path,
		}).Info("Request received")

		next.ServeHTTP(lrw, r)

		logrus.WithFields(logrus.Fields{
			"method":     r.Method,
			"url":        r.URL.Path,
			"duration":   time.Since(start),
			"statusCode": lrw.statusCode,
		}).Info("Request handled")
	})
}
