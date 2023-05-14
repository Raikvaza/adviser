package repository

import (
	"context"
	"database/sql"
	"diplomka/internal/model"
	"errors"
	"fmt"
)

// AddAssets adds a new asset to the database and returns the added asset as a pointer to a Loan_Debt model
// The method takes a context and a Loan_Debt model as input parameters and returns a pointer to the added asset and an error
func (ass *repo) AddAssets(ctx context.Context, asl model.Loan_Debt) (*model.Loan_Debt, error) {
	// Prepare the query to insert a new asset to the database
	query := `INSERT INTO loan (user_id, type, amount, date, description) VALUES (?,?,?,?,?);`

	// Execute the query and get the result as a sql.Result object
	res, err := ass.DB.ExecContext(ctx, query, asl.UserID, asl.TypeID, asl.Amount, asl.Date.Format("2006-01-02"), asl.Description)
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method ExecContext: %v", err)
	}

	// Create a new empty asset object
	ast := model.Loan_Debt{}

	// Get the last inserted ID from the result object and set it to the asset object
	ast.ID, err = res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("error was ocured during executing method LastInsertId: %v", err)
	}

	// Return a pointer to the asset object
	return &ast, nil
}

// GetAssets retrieves the assets of a user within a specified period of time.
// The function takes a context object and a Between object as input.
// It returns a slice of Loan_Debt objects and an error, if any occurred during the execution of the function.
func (ass *repo) GetAssets(ctx context.Context, bet model.Between) ([]*model.Loan_Debt, error) {
	// Initialize an empty slice to hold the results.
	astarr := make([]*model.Loan_Debt, 0)

	// Construct the SQL query to retrieve the assets within the specified period of time.
	query := `SELECT * FROM loan where user_id=? and date BETWEEN ? and ?`

	// Execute the query and get a rows object.
	row, err := ass.DB.QueryxContext(ctx, query, bet.UserID, bet.StartDate.Format("2006-01-02"), bet.EndDate.Format("2006-01-02"))
	if err != nil {
		return nil, err
	}

	// Close the rows object after the function returns.
	defer row.Close()

	// Loop through the rows object and scan each row into a Loan_Debt object.
	for row.Next() {
		ast := &model.Loan_Debt{}
		err := row.Scan(&ast.ID, &ast.UserID, &ast.TypeID, &ast.Amount, &ast.Description, &ast.Date)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return nil, fmt.Errorf("No rows into table")
			} else {
				return nil, err
			}
		}
		// Set the status of the Loan_Debt object to true and append it to the slice.
		ast.Status = true
		astarr = append(astarr, ast)
	}

	// Check for any errors during the looping process.
	if err = row.Err(); err != nil {
		return nil, fmt.Errorf("Error from row")
	}

	// Return the slice of Loan_Debt objects and nil error if there was no error.
	return astarr, nil
}
