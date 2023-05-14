package service_planner

import (
	"context"
	"fmt"

	"diplomka/internal/model"
)

type planner struct {
	model.PlannerRepo
}

func New(r model.PlannerRepo) *planner {
	return &planner{
		PlannerRepo: r,
	}
}

func (p *planner) AddSpendingPlanner(ctx context.Context, planner model.SpendingPlanner) error {
	err := p.PlannerRepo.AddPlannerSpending(ctx, planner)
	if err != nil {
		return fmt.Errorf("planner repo: %v", err)
	}

	return nil
}

func (p *planner) GetPlanner(ctx context.Context, bet model.Between) (map[int]model.Planner, error) {
	planner, err := p.PlannerRepo.GetPlanner(ctx, bet)
	if err != nil {
		return nil, fmt.Errorf("planner repo: %v", err)
	}
	return planner, nil
}
