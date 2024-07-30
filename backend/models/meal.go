package models

type Meal struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Foods []Food `json:"foods"`
}
