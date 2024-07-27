package routes

import (
	"encoding/json"
	"meal-mapper/database"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func test(w http.ResponseWriter, r *http.Request) {
	_, err := database.DB.Exec("INSERT INTO tests (name) VALUES (?)", "Will")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("teste")
}

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	router.Use(loggingMiddleware)
	router.HandleFunc("/test", test).Methods("POST")

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

		logrus.WithField(logrus.Fields{
			"method": r.Method,
			"url":    r.URL.Path,
		}).Info("Request recived")

		next.ServeHTTP(lrw, r)

		logrus.WithField(logrus.Fields{
			"method":     r.Method,
			"url":        r.URL.Path,
			"duration":   time.Since(start),
			"statusCode": lrw.statusCode,
		}).Info("Request handled")
	})
}
