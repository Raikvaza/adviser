package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// AddIncome inserts a new income record into the database and returns the inserted record as a *model.Income object, or an error if one occurs.
// The context.Context argument allows for cancellation or timeouts to be set externally.
func (i *repo) AddIncome(ctx context.Context, inc model.Income) (*model.Income, error) {
	// Construct a SQL query to insert a new income record into the database.
	query := `INSERT INTO income (user_id, income_type, amount, date, description) VALUES (?,?,?,?,?);`

	// Execute the SQL query using the constructed arguments.
	res, err := i.DB.ExecContext(ctx, query, inc.UserID, inc.IncomeTypeID, inc.Amount, inc.Date.Format("2006-01-02"), inc.Description)
	if err != nil {
		// If an error occurs, return nil and a custom error message.
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}

	// Retrieve the ID of the inserted record from the result of the SQL query.
	inc.ID, err = res.LastInsertId()
	if err != nil {
		// If an error occurs, return nil and a custom error message.
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}

	// Return a pointer to the inserted *model.Income object and nil.
	return &inc, nil
}

// GetIncome retrieves income data from the database based on a user ID and a date range.
// It returns a slice of Income pointers and an error.
func (i *repo) GetIncome(ctx context.Context, bet model.Between) ([]*model.Income, error) {
	incarr := make([]*model.Income, 0)

	// Define the SQL query to retrieve income data within the date range.
	query := `SELECT * FROM income where user_id=? and date BETWEEN ? and ?`

	// Execute the SQL query and retrieve the rows.
	row, err := i.DB.QueryxContext(ctx, query, bet.UserID, bet.StartDate.Format("2006-01-02"), bet.EndDate.Format("2006-01-02"))
	if err != nil {
		return nil, err
	}

	defer row.Close()

	// Iterate through the rows and retrieve the income data.
	for row.Next() {
		inc := &model.Income{}

		err := row.Scan(&inc.ID, &inc.UserID, &inc.IncomeTypeID, &inc.Amount, &inc.Description, &inc.Date)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}

		incarr = append(incarr, inc)
	}

	// Check for any errors during the iteration.
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}
	return incarr, nil
}
