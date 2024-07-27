package database

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

//TODO: change the database for a postgress one.

func Connect() {
	var err error
	DB, err = sql.Open("sqlite3", "./mealmapper.db")

	if err != nil {
		log.Fatal(err)
	}

	CreateTables()
}

func CreateTables() {
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	schemaFile := filepath.Join(dir, "database", "tables", "schemas.sql")

	schema, err := os.ReadFile(schemaFile)
	if err != nil {
		log.Fatal(err)
	}

	_, err = DB.Exec(string(schema))
	if err != nil {
		log.Fatal(err)
	}
}
