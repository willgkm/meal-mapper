CREATE TABLE IF NOT EXISTS foods ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    weight NUMBER,
    portion NUMBER,
    calories REAL,
    protein REAL,
    carbs REAL,
    fat REAL
);

CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT
);

CREATE TABLE IF NOT EXISTS meal_foods (
    meal_id INTEGER,
    food_id INTEGER,
    FOREIGN KEY (meal_id) REFERENCES meals(id), 
    FOREIGN KEY (food_id) REFERENCES foods(id)
);