package model

import (
	"errors"
)

type Between struct {
	UserID    int64      `json:"-" db:"user_id"`
	StartDate CustomTime `json:"start_date" db:"start_date"`
	EndDate   CustomTime `json:"end_date" db:"end_date"`
}

func (b *Between) Validate() error {
	if b.UserID <= 0 {
		return errors.New("user ID must be greater than 0")
	}
	if b.StartDate.After(b.EndDate.Time) {
		return errors.New("start date cannot be after end date")
	}
	return nil
}
