package model

import (
	"errors"
	"strings"
)

type Income struct {
	ID           int64  `db:"id"`
	UserID       int64  `db:"user_id" json:"user_id"`
	IncomeTypeID int64  `db:"income_type_id" json:"income_type_id"`
	Amount       int64  `db:"amount" json:"amount"`
	Description  string `db:"description" json:"description"`
	// Формат времени, в котором мы будем хранить время, - "2006-01-02".
	// С помощью такого формата мы будем получать значение в виде строки.
	// Пример кода, как из time.Time получить строку:
	// time.Now().Format("2006-01-02").
	Date CustomTime `db:"date" json:"date"`
}

func (i *Income) Validate() error {
	if i.UserID <= 0 {
		return errors.New("user ID should be a positive number")
	}
	if i.IncomeTypeID <= 0 {
		return errors.New("income type ID should be a positive number")
	}
	if i.Amount < 0 {
		return errors.New("amount should be a non-negative number")
	}
	if strings.TrimSpace(i.Description) == "" {
		return errors.New("description cannot be empty or contain only whitespaces")
	}
	if strings.HasPrefix(i.Description, " ") || strings.HasSuffix(i.Description, " ") {
		return errors.New("description cannot start or end with whitespace")
	}
	return nil
}

type Income_Spending struct {
	Income   []*Income
	Spending []*Spending
}
