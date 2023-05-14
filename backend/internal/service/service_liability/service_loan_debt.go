package service_liability

import (
	"context"
	"diplomka/internal/model"
	"fmt"
)

// AddLoanDebtService is a function that adds a new loan or debt entry to the database based on the 'Status' value.
// If Status is true, it adds the entry to the asset table, and if it is false, it adds it to the liability table.
// It returns the newly created object and an error if any occurred.

func (l *liability) AddLoanDebtService(ctx context.Context, asl model.Loan_Debt) (*model.Loan_Debt, error) {
	var obj *model.Loan_Debt
	var err error
	if asl.Status {
		obj, err = l.AddAssets(ctx, asl)
		if err != nil {
			return nil, fmt.Errorf("get spending repo: %v", err)
		}
	} else {
		obj, err = l.AddLiabilities(ctx, asl)
		if err != nil {
			return nil, fmt.Errorf("get spending repo: %v", err)
		}

	}

	return obj, nil
}

// GetLoanDebtService is a function that retrieves loan and debt entries from the database based on the given date range.
// It returns two slices, one containing assets and the other containing liabilities, and an error if any occurred.
func (l *liability) GetLoanDebtService(ctx context.Context, bet model.Between) ([]*model.Loan_Debt, []*model.Loan_Debt, error) {
	obj, err := l.GetAssets(ctx, bet)
	if err != nil {
		return nil, nil, fmt.Errorf("get income repo: %v", err)
	}
	obj2, err := l.GetLiabilities(ctx, bet)
	if err != nil {
		return nil, nil, fmt.Errorf("get income repo: %v", err)
	}

	return obj, obj2, nil
}
