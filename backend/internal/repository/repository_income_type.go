package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// GetIncomeType retrieves all income types from the database and returns them as a slice of *model.IncomeType objects, or an error if one occurs.
// The context.Context argument allows for cancellation or timeouts to be set externally.
func (i *repo) GetIncomeType(ctx context.Context) ([]*model.IncomeType, error) {
	// Initialize an empty slice to hold the income types we will retrieve.
	itarr := make([]*model.IncomeType, 0)

	// Construct a SQL query to retrieve all income types from the database.
	query := `SELECT * FROM incometype`

	// Query the database using the constructed SQL query.
	row, err := i.DB.QueryContext(ctx, query)
	if err != nil {
		// If an error occurs, return nil and a custom error message.
		return nil, fmt.Errorf("Error from QueryContext")
	}

	// Defer closing the query's rows object until the function returns.
	defer row.Close()

	// Iterate through the returned rows, creating an *model.IncomeType object for each and appending it to our slice.
	for row.Next() {
		it := &model.IncomeType{}
		err := row.Scan(&it.ID, &it.IncomeType)
		if err != nil {
			// If an error occurs while scanning the row, check if it is due to no rows being returned. If so, return nil and a custom error message. Otherwise, return nil and the error.
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}
		itarr = append(itarr, it)
	}

	// Check for any errors that may have occurred during iteration, and return nil and a custom error message if so.
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	// If no errors have occurred, return the slice of *model.IncomeType objects and nil.
	return itarr, nil
}
