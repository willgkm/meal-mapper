package models

type Food struct {
	id       int    `json:"id"`
	name     string `json:"name"`
	weight   int8   `json:"weight"`
	portion  int8   `json:"portion"`
	calories int8   `json:"calories"`
	protein  int8   `json:"protein"`
	carbs    int8   `json:"carbs"`
	fat      int8   `json:"fat"`
}
