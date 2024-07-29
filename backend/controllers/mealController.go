package controllers

import (
	"encoding/json"
	"meal-mapper/database"
	"meal-mapper/models"
	"net/http"
	"strconv"
)

func CreateMeal(w http.ResponseWriter, r *http.Request) {
	var meal models.Meal
	json.NewDecoder(r.Body).Decode(&meal)

	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stmt, err := tx.Prepare("INSERT INTO meals(name) VALUES(?)")
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	res, err := stmt.Exec(meal.Name)
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	mealID, err := res.LastInsertId()
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	stmt, err = tx.Prepare("INSERT INTO meal_foods(meal_id, food_id) VALUES(?, ?)")
	if err != nil {
		tx.Rollback()
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, food := range meal.Foods {

		err = database.DB.QueryRow("SELECT id FROM foods WHERE id = ?", food.ID).Scan(
			&food.ID)
		if err != nil {
			http.Error(w, "Invalid food with ID = "+strconv.Itoa(food.ID), http.StatusInternalServerError)
			return
		}

		_, err = stmt.Exec(mealID, food.ID)
		if err != nil {
			tx.Rollback()
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	tx.Commit()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(meal)
}

func GetMeals(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, name FROM meals")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var meals []models.Meal
	for rows.Next() {
		var meal models.Meal
		err := rows.Scan(&meal.ID, &meal.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		foodRows, err := database.DB.Query("SELECT foods.id, foods.name, foods.weight, foods.portion, foods.calories, foods.protein, foods.carbs, foods.fat FROM foods JOIN meal_foods ON foods.id = meal_foods.food_id WHERE meal_foods.meal_id = ?", meal.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var foods []models.Food
		for foodRows.Next() {
			var food models.Food
			err := foodRows.Scan(&food.ID, &food.Name, &food.Weight, &food.Portion, &food.Calories, &food.Protein, &food.Carbs, &food.Fat)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			foods = append(foods, food)
		}

		meal.Foods = foods
		meals = append(meals, meal)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(meals)
}
