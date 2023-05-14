package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

func (u *repo) AddUser(ctx context.Context, user model.User) (*model.User, error) {
	// Define SQL query for inserting new user into the database
	query := `INSERT INTO users (name, surname, email, password) VALUES (?,?,?,?);`

	// Execute query with user data and return any errors that occur
	res, err := u.DB.ExecContext(ctx, query, user.Name, user.Surname, user.Email, user.Password)
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}

	// Get ID of the newly inserted user from the database and return any errors that occur
	user.ID, err = res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}

	// Return the inserted user object
	return &user, nil
}

func (u *repo) GetUser(ctx context.Context, id int) (*model.User, error) {
	// Define SQL query for retrieving a user by their ID from the database
	query := `select * from users where id=?`

	// Execute query with the user ID and return any errors that occur
	row := u.DB.QueryRowContext(ctx, query, id)
	if err := row.Err(); err != nil {
		return nil, fmt.Errorf("error was ocured during executing method QueryRowContext: %v", err)
	}

	// Scan the retrieved user data into a new user object and return any errors that occur
	x := &model.User{}
	err := row.Scan(&x.ID, &x.Name, &x.Surname, &x.Email, &x.Password)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		} else {
			return nil, err
		}
	}
	return x, nil
}

func (u *repo) DeleteUser(ctx context.Context, userID int64) error {
	// Begin a transaction for deleting a user and related data
	tx, err := u.DB.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	// Rollback the transaction if an error occurs during any delete operation
	defer tx.Rollback()

	// Delete all spending data associated with the user
	_, err = tx.ExecContext(ctx, `DELETE FROM spending WHERE user_id = ?`, userID)
	if err != nil {
		return err
	}

	// Delete all income data associated with the user
	_, err = tx.ExecContext(ctx, `DELETE FROM income WHERE user_id = ?`, userID)
	if err != nil {
		return err
	}

	// Delete all loan data associated with the user
	_, err = tx.ExecContext(ctx, `DELETE FROM loan WHERE user_id = ?`, userID)
	if err != nil {
		return err
	}

	// Delete all debt data associated with the user
	_, err = tx.ExecContext(ctx, `DELETE FROM debt WHERE user_id = ?`, userID)
	if err != nil {
		return err
	}

	// Delete the user's image from the database
	_, err = tx.ExecContext(ctx, `DELETE FROM images WHERE user_id = ?`, userID)
	if err != nil {
		return err
	}

	// Delete the user from the database
	_, err = tx.ExecContext(ctx, `DELETE FROM users WHERE id = ?`, userID)
	if err != nil {
		return err
	}

	// Commit the transaction
	return tx.Commit()
}

// GetUserforAuth fetches a user from the database based on the provided email and password.
func (u *repo) GetUserforAuth(ctx context.Context, auth model.Authentication) (*model.User, error) {
	x := model.User{}
	query := `select * from users where email=? and password=?`
	row := u.DB.QueryRowContext(ctx, query, auth.Email, auth.Password)

	// Check for any errors returned by QueryRowContext
	if err := row.Err(); err != nil {
		return nil, fmt.Errorf("error was ocured during executing method QueryRowContext: %v", err)
	}

	// Scan the row returned by the query and assign values to the User struct
	err := row.Scan(&x.ID, &x.Name, &x.Surname, &x.Email, &x.Password)
	if err != nil {
		// Check if the error is due to no rows being returned
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		} else {
			return nil, err
		}
	}

	return &x, nil
}

// AddUserImage adds an image to the database for a specific user.
func (u *repo) AddUserImage(ctx context.Context, info model.UserImage) (*model.UserImage, error) {
	query := `INSERT INTO images (user_id, image_name) VALUES (?,?)`

	// Execute the query and return any errors
	res, err := u.DB.ExecContext(ctx, query, info.UserID, info.ImageName)
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}

	// Update the UserImage struct with the last inserted ID
	info.UserID, err = res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}
	return &info, nil
}

// GetUserImage retrieves an image for a specific user from the database.
func (u *repo) GetUserImage(ctx context.Context, id int64) (*model.UserImage, error) {
	query := `Select * from images where user_id=?`

	// Execute the query and get the row returned by the query
	row := u.DB.QueryRowxContext(ctx, query, id)

	// Create a new UserImage struct and scan the row returned by the query
	info := model.UserImage{}
	err := row.Scan(&info.UserID, &info.ImageName)
	if err != nil {
		// Check if the error is due to no rows being returned
		if errors.Is(err, sql.ErrNoRows) {
			return nil, fmt.Errorf("no avatar found for user") // Return a custom error
		} else {
			return nil, err
		}
	}

	return &info, nil
}

// DeleteImage removes an image from the database for a specific user.
func (u *repo) DeleteImage(ctx context.Context, id int64) error {
	query := `DELETE FROM images WHERE user_id=?`
	_, err := u.DB.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}
	return nil
}
