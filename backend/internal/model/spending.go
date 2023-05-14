package model

import (
	"errors"
	"strings"
)

type Spending struct {
	ID             int64
	UserID         int64  `json:"user_id"`
	SpendingTypeID int64  `json:"spending_type_id"`
	Amount         int64  `json:"amount"`
	Description    string `json:"description"`
	// Формат времени, в котором мы будем хранить время, - "2006-01-02".
	// С помощью такого формата мы будем получать значение в виде строки.
	// Пример кода, как из time.Time получить строку:
	// time.Now().Format("2006-01-02").
	Date CustomTime `json:"date"`
}

func (s *Spending) Validate() error {
	if s.UserID <= 0 {
		return errors.New("invalid user ID")
	}
	if s.SpendingTypeID <= 0 {
		return errors.New("invalid spending type ID")
	}
	if s.Amount <= 0 {
		return errors.New("invalid amount")
	}
	if strings.TrimSpace(s.Description) == "" {
		return errors.New("invalid description")
	}
	if strings.HasPrefix(s.Description, " ") || strings.HasSuffix(s.Description, " ") {
		return errors.New("description cannot start or end with spaces")
	}

	return nil
}
