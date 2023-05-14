package model

type IncomeType struct {
	ID         int64
	IncomeType string
}

type IncomeSpendType struct {
	Type_income   []*IncomeType
	Type_spending []*SpendingType
}
