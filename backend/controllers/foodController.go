package controllers

import (
	"encoding/json"
	"meal-mapper/database"
	"meal-mapper/models"
	"net/http"
)

func CreateFood(w http.ResponseWriter, r *http.Request) {
	var food models.Food
	json.NewDecoder(r.Body).Decode(&food)

	stmt, err := database.DB.Prepare("INSERT INTO foods(name, weight, portion, calories, protein, carbs, fat) VALUES(?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = stmt.Exec(food.Name, food.Weight, food.Portion, food.Calories, food.Protein, food.Carbs, food.Fat)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(food)
}

func GetFoods(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT * FROM foods")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var foods []models.Food
	for rows.Next() {
		var food models.Food
		err := rows.Scan(&food.ID, &food.Name, &food.Weight, &food.Portion, &food.Calories, &food.Protein, &food.Carbs, &food.Fat)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		foods = append(foods, food)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(foods)
}
