package service_liability

import (
	"context"
	"diplomka/internal/model"
	"fmt"
)

// This function is a method of the liability struct and returns a list of all available loan/debt types. It takes a context.Context argument and returns a slice of pointers to model.LoanDebtType objects and an error. If the operation is successful, the function returns a list of loan/debt types retrieved from the underlying repository. If there is an error while retrieving the loan/debt types, the function returns an error with an appropriate error message.
func (l *liability) GetAllLoanDebtTypeService(ctx context.Context) ([]*model.LoanDebtType, error) {
	obj, err := l.GetLoandebtTypeRepo(ctx)
	if err != nil {
		return nil, fmt.Errorf("get spending repo: %v", err)
	}

	return obj, nil
}
