package model

import "errors"

type SpendingPlanner struct {
	UserID         int64 `db:"user_id"`
	SpendingTypeID int64 `json:"type_id" db:"spending_type_id"`
	Amount         int64 `json:"amount" db:"amount"`
}

func (s *SpendingPlanner) Validate() error {
	if s.UserID <= 0 {
		return errors.New("user ID should be a positive number")
	}

	if s.SpendingTypeID <= 0 {
		return errors.New("invalid spending type ID")
	}

	if s.Amount <= 0 {
		return errors.New("invalid amount")
	}

	return nil
}

type Planner struct {
	Amount     int64 `json:"amount"`
	Spending   int64 `json:"spending"`
	Difference int64 `json:"difference"`
}
