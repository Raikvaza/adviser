package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// Below represented function which work in adding and getting data (loan and debt) to database

// AddLiabilities adds a new liability to the database.
func (lia *repo) AddLiabilities(ctx context.Context, ast model.Loan_Debt) (*model.Loan_Debt, error) {
	// SQL query to insert a new liability
	query := `INSERT INTO debt (user_id, type, amount, date, description) VALUES (?,?,?,?,?);`
	// Execute the query and get the result
	res, err := lia.DB.ExecContext(ctx, query, ast.UserID, ast.TypeID, ast.Amount, ast.Date.Format("2006-01-02"), ast.Description)
	if err != nil {
		// If there was an error executing the query, return an error
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}
	// Get the ID of the newly added liability
	liab := model.Loan_Debt{}
	liab.ID, err = res.LastInsertId()
	if err != nil {
		// If there was an error getting the ID, return an error
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}
	// Return the new liability
	return &liab, nil
}

// GetLiabilities retrieves a slice of all loan and debt records for the given user ID that fall within the specified date range.
// It returns a slice of *model.Loan_Debt objects, or an error if one occurs.
// The context.Context argument allows for cancellation or timeouts to be set externally.
// The bet argument specifies the user ID, start date, and end date for the records to be retrieved.
func (lia *repo) GetLiabilities(ctx context.Context, bet model.Between) ([]*model.Loan_Debt, error) {
	// Initialize an empty slice to hold the loan/debt records we will retrieve.
	liaarr := make([]*model.Loan_Debt, 0)

	// Construct a SQL query to retrieve all records that match the specified user ID and fall within the given date range.
	query := `SELECT * FROM debt where user_id=? and date BETWEEN ? and ?`

	// Query the database using the constructed SQL query, passing in the user ID and date range as arguments.
	row, err := lia.DB.QueryxContext(ctx, query, bet.UserID, bet.StartDate.Format("2006-01-02"), bet.EndDate.Format("2006-01-02"))
	if err != nil {
		// If an error occurs, return nil and the error.
		return nil, err
	}

	// Defer closing the query's rows object until the function returns.
	defer row.Close()

	// Iterate through the returned rows, creating a *model.Loan_Debt object for each and appending it to our slice.
	for row.Next() {
		lia := &model.Loan_Debt{}
		err := row.Scan(&lia.ID, &lia.UserID, &lia.TypeID, &lia.Amount, &lia.Description, &lia.Date)
		if err != nil {
			// If an error occurs while scanning the row, check if it is due to no rows being returned. If so, return nil and a custom error message. Otherwise, return nil and the error.
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}
		liaarr = append(liaarr, lia)
	}

	// Check for any errors that may have occurred during iteration, and return nil and a custom error message if so.
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	// If no errors have occurred, return the slice of *model.Loan_Debt objects and nil.
	return liaarr, nil
}
