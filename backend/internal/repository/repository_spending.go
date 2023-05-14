package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// AddSpending adds a new spending record to the database using the provided context and Spending object.
// It returns the newly inserted Spending object and an error if one occurred during the process.
func (s *repo) AddSpending(ctx context.Context, spn model.Spending) (*model.Spending, error) {
	// Prepare the SQL query
	query := `INSERT INTO spending (user_id, spending_type, amount, date, description) VALUES (?,?,?,?,?);`

	// Execute the query and get the result set
	res, err := s.DB.ExecContext(ctx, query, spn.UserID, spn.SpendingTypeID, spn.Amount, spn.Date.Format("2006-01-02"), spn.Description)
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}

	// Get the last inserted ID and set it to the Spending object
	spn.ID, err = res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}

	// Return the populated Spending object and a nil error
	return &spn, nil
}

// GetSpending retrieves all spending records for a specific user and within a specific date range from the database using the provided context.
// It returns a slice of Spending objects and an error if one occurred during the process.

func (s *repo) GetSpending(ctx context.Context, bet model.Between) ([]*model.Spending, error) {
	// Initialize an empty slice of Spending pointers
	incarr := make([]*model.Spending, 0)

	// Prepare the SQL query
	query := `SELECT * FROM spending where user_id=? and date BETWEEN ? and ?`

	// Execute the query and get the result set
	row, err := s.DB.QueryxContext(ctx, query, bet.UserID, bet.StartDate.Format("2006-01-02"), bet.EndDate.Format("2006-01-02"))
	if err != nil {
		return nil, err
	}
	defer row.Close()

	// Iterate over the result set
	for row.Next() {
		// Initialize a new Spending pointer
		spn := &model.Spending{}

		// Scan the current row and populate the Spending object
		err := row.Scan(&spn.ID, &spn.UserID, &spn.SpendingTypeID, &spn.Amount, &spn.Description, &spn.Date)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}

		// Append the populated Spending object to the slice
		incarr = append(incarr, spn)
	}

	// Check for any errors during iteration
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	// Return the slice of Spending objects and a nil error
	return incarr, nil
}
