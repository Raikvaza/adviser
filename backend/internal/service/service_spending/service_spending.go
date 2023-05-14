package service_spending

import (
	"context"
	"fmt"

	"diplomka/internal/model"
)

type spending struct {
	model.SpendingRepo
}

func New(spn model.FinancialRepo) *spending {
	return &spending{
		SpendingRepo: spn,
	}
}

// InsertSpendingService inserts a new spending into the database and returns the created object.
// It takes a context and a model.Spending object as parameters.
// It returns a pointer to the created object and an error, if any occurred.
func (s *spending) InsertSpendingService(ctx context.Context, spn model.Spending) (*model.Spending, error) {
	obj, err := s.SpendingRepo.AddSpending(ctx, spn)
	if err != nil {
		return nil, fmt.Errorf("get income repo: %v", err)
	}

	return obj, nil
}

// GetSpendingService returns a list of spending objects within the given time range.
// It takes a context and a model.Between object as parameters.
// It returns a slice of model.Spending objects and an error, if any occurred.
func (s *spending) GetSpendingService(ctx context.Context, bet model.Between) ([]*model.Spending, error) {
	obj, err := s.SpendingRepo.GetSpending(ctx, bet)
	if err != nil {
		return nil, fmt.Errorf("get income repo: %v", err)
	}

	return obj, nil
}
