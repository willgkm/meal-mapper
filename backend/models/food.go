package models

type Food struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Weight   int    `json:"weight"`
	Portion  int    `json:"portion"`
	Calories int    `json:"calories"`
	Protein  int    `json:"protein"`
	Carbs    int    `json:"carbs"`
	Fat      int    `json:"fat"`
}
