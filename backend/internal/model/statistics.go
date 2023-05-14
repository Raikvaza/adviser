package model

type Statistics struct {
	ValueSpending ValueSpending `json:"value_spending"`
	ValueIncome   ValueIncome   `json:"value_income"`
	StartDate     CustomTime    `json:"start_date" db:"start_date"`
	EndDate       CustomTime    `json:"end_date" db:"end_date"`
}

type ValueSpending struct {
	Spendings   []Value `json:"spendings"`
	TotalAmount int64   `json:"total_amount" db:"sum"`
}

type ValueIncome struct {
	Incomes     []Value `json:"incomes"`
	TotalAmount int64   `json:"total_amount" db:"sum"`
}

type Value struct {
	TypeID     int64   `json:"type_id" db:"type_id"`
	Percentage float64 `json:"percentage" db:"percentage"`
	Total      int64   `json:"total" db:"total"`
}
