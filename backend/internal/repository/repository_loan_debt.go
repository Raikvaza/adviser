package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// GetLoandebtTypeRepo retrieves all the loan and debt types from the database.
// It returns a slice of pointers to model.LoanDebtType.
func (alt *repo) GetLoandebtTypeRepo(ctx context.Context) ([]*model.LoanDebtType, error) {
	ldarr := make([]*model.LoanDebtType, 0)

	// Query the database to retrieve all the loan and debt types.
	query := `SELECT * FROM loandebttype`
	row, err := alt.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("Error from QueryContext")
	}
	defer row.Close()

	// Iterate over the rows and scan each one into a new LoanDebtType struct.
	for row.Next() {
		ld := &model.LoanDebtType{}
		err := row.Scan(&ld.ID, &ld.Type)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}
		ldarr = append(ldarr, ld)
	}

	// Check if there were any errors during iteration or scanning.
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	return ldarr, nil
}
