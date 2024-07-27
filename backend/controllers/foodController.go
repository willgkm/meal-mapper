package controllers

import (
	"encoding/json"
	"meal-mapper/database"
	"meal-mapper/models"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

func GetFoodById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid food ID", http.StatusBadRequest)
		return
	}

	var food models.Food
	err = database.DB.QueryRow("SELECT * FROM foods WHERE id = ?", id).Scan(
		&food.ID, &food.Name, &food.Weight, &food.Portion, &food.Calories, &food.Protein, &food.Carbs, &food.Fat)
	if err != nil {
		http.Error(w, "Food not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(food)
}

func DeleteFoodById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid food ID", http.StatusBadRequest)
		return
	}

	stmt, err := database.DB.Prepare("DELETE FROM foods WHERE id = ?")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res, err := stmt.Exec(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Food not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
