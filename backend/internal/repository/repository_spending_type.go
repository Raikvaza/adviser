package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// GetSpendingType retrieves all spending types from the database using the provided context.
// It returns a slice of spending types and an error if one occurred during the process.

func (s *repo) GetSpendingType(ctx context.Context) ([]*model.SpendingType, error) {
	// Initialize an empty slice of SpendingType pointers
	starr := make([]*model.SpendingType, 0)

	// Prepare the SQL query
	query := `SELECT * FROM spendingtype`

	// Execute the query and get the result set
	row, err := s.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("Error from QueryContext")
	}
	defer row.Close()

	// Iterate over the result set
	for row.Next() {
		// Initialize a new SpendingType pointer
		st := &model.SpendingType{}

		// Scan the current row and populate the SpendingType object
		err := row.Scan(&st.ID, &st.SpendingType)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}

		// Append the populated SpendingType object to the slice
		starr = append(starr, st)
	}

	// Check for any errors during iteration
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	// Return the slice of spending types and a nil error
	return starr, nil
}
