package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

//change the database for a postgress one.

func Connect() {
	var err error
	DB, err = sql.Open("sqlite3", "./mealmapper.db")

	if err != nil {
		log.Fatal(err)
	}

	CreateTables()
}

func CreateTables() {

	createTestTable := `CREATE TABLE IF NOT EXISTS tests  ( 
		id INTEGER PRIMARY KEY AUTOINCREMENT,	
		name TEXT
	);`

	_, err := DB.Exec(createTestTable)
	if err != nil {
		log.Fatal(err)
	}
}
