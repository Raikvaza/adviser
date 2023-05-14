package service

import (
	"diplomka/internal/model"
	"diplomka/internal/service/service_financial_type"
	"diplomka/internal/service/service_income"
	"diplomka/internal/service/service_liability"
	"diplomka/internal/service/service_planner"
	"diplomka/internal/service/service_spending"
	"diplomka/internal/service/service_statistics"
)

// The financialTracker struct represents an implementation of the model.FinancialTrackerService interface that combines various financial services. It includes the IncomeService, SpendingService, StatisticsService, FinancialTypeService, and FinancialLiabilityService services, which are each implementations of their respective interfaces.
type financialTracker struct {
	model.IncomeService
	model.SpendingService
	model.StatisticsService
	model.FinancialTypeService
	model.FinancialLiabilityService
	model.FinancialPlannerService
}

// The NewFinancialTrackerService function is a constructor function that returns an instance of financialTracker with the provided model.FinancialRepo repository. The returned financialTracker instance will have all its service fields initialized with their respective implementation services created with the provided repository.
func NewFinancialTrackerService(f model.FinancialRepo) model.FinancialTrackerService {
	return &financialTracker{
		IncomeService:             service_income.New(f),
		SpendingService:           service_spending.New(f),
		StatisticsService:         service_statistics.New(f),
		FinancialTypeService:      service_financial_type.New(f),
		FinancialLiabilityService: service_liability.New(f),
		FinancialPlannerService:   service_planner.New(f),
	}
}
