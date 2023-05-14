package handlers_financial

import "diplomka/internal/model"

type financial struct {
	model.FinancialTrackerService
}

func NewFinancialHandlers(fs model.FinancialTrackerService) *financial {
	return &financial{
		FinancialTrackerService: fs,
	}
}
