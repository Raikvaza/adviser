package service_income

import (
	"context"
	"fmt"

	"diplomka/internal/model"
)

type income struct {
	model.IncomeRepo
}

func New(inc model.FinancialRepo) *income {
	return &income{
		IncomeRepo: inc,
	}
}

// InsertIncomeService is a method to insert income to the database through income repository.
// It takes a context and income data model as input parameters, and returns income model and error.
// If an error is encountered, it returns nil and the error.

func (s *income) InsertIncomeService(ctx context.Context, inc model.Income) (*model.Income, error) {
	obj, err := s.IncomeRepo.AddIncome(ctx, inc)
	if err != nil {
		return nil, fmt.Errorf("get income repo: %v", err)
	}

	return obj, nil
}

// GetIncomeService is a method to get income data from the database through income repository.
// It takes a context and between model as input parameters, and returns slice of income models and error.
// If an error is encountered, it returns nil and the error.

func (s *income) GetIncomeService(ctx context.Context, bet model.Between) ([]*model.Income, error) {
	obj, err := s.IncomeRepo.GetIncome(ctx, bet)
	if err != nil {
		return nil, fmt.Errorf("get income repo: %v", err)
	}

	return obj, nil
}
