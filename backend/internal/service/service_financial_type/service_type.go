package service_financial_type

import (
	"context"
	"fmt"

	"diplomka/internal/model"
)

type financialType struct {
	model.FinancialRepo
}

func New(f model.FinancialRepo) *financialType {
	return &financialType{
		FinancialRepo: f,
	}
}

// GetAllIncomeSpendingService is a method that retrieves all available income types and spending types from the financial repository.
// It receives a context.Context as parameter and returns two slices of pointers to model.IncomeType and model.SpendingType structs and an error.
// The method first calls the GetIncomeType method of the financial repository to retrieve all income types, and if there's an error, it returns nil for both slices and the error.
// Then it calls the GetSpendingType method of the financial repository to retrieve all spending types, and if there's an error, it returns nil for both slices and the error.
// If there are no errors, it returns the slices of income and spending types and nil for the error.
func (s *financialType) GetAllIncomeSpendingService(ctx context.Context) ([]*model.IncomeType, []*model.SpendingType, error) {
	inctype, err := s.FinancialRepo.GetIncomeType(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("get spending repo: %v", err)
	}
	spntype, err := s.FinancialRepo.GetSpendingType(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("get spending repo: %v", err)
	}

	return inctype, spntype, nil
}
