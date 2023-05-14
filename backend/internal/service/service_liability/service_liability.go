package service_liability

import "diplomka/internal/model"

type liability struct {
	model.DebtorRepo
}

func New(dr model.DebtorRepo) *liability {
	return &liability{
		DebtorRepo: dr,
	}
}
