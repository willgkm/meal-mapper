package models

type Meal struct {
	id    int    `json:"id"`
	name  string `json:"name"`
	Foods []Food `json:"foods"`
}
