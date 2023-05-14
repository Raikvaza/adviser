package repository

import "github.com/jmoiron/sqlx"

// The repo struct represents a repository, which is used to access and manipulate data in the database. The DB field is a pointer to a sqlx.DB object, which provides a connection to the database.
type repo struct {
	DB *sqlx.DB
}

// The NewRepository function is a constructor for the repo struct. It takes a pointer to a sqlx.DB object as its argument and returns a pointer to a new repo object with the DB field set to the provided sqlx.DB object. This function is used to create a new instance of the repo struct.
func NewRepository(db *sqlx.DB) *repo {
	return &repo{
		DB: db,
	}
}
