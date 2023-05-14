package model

import (
	"errors"
	"strings"
)

type Loan_Debt struct {
	ID          int64      `json:"id"`
	UserID      int64      `json:"user_id"`
	TypeID      int64      `json:"type_id"`
	Description string     `json:"description"`
	Amount      int64      `json:"amount"`
	Date        CustomTime `json:"date"`
	Status      bool       `json:"status"`
}

type MergeStruct struct {
	LoanArr []*Loan_Debt
	DebtArr []*Loan_Debt
}

func (i *Loan_Debt) Validate() error {
	if i.UserID <= 0 {
		return errors.New("user ID should be a positive number")
	}
	if i.TypeID <= 0 {
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
