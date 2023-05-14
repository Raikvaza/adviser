package repository

import (
	"context"
	"diplomka/internal/model"
	"log"
)

// GetStatistics retrieves the statistics for a user within a specified time range.
// It returns a model.Statistics struct which includes the total amount of income and spending,
// and the percentage breakdown of each income and spending category.

func (s *repo) GetStatistics(ctx context.Context, b model.Between) (model.Statistics, error) {
	stat := model.Statistics{}

	// query to calculate the total income for the given user and time period
	querySumIncome := `
	SELECT ifnull(sum(amount), 0) AS sum
	FROM income WHERE user_id = ?
	AND date  BETWEEN ? AND ?`

	// execute the query and scan the result into the `ValueIncome` field of the `stat` variable
	row := s.DB.QueryRowxContext(ctx, querySumIncome, b.UserID, b.StartDate, b.EndDate)
	err := row.StructScan(&stat.ValueIncome)
	if err != nil {
		return stat, err
	}

	// query to calculate the total spending for the given user and time period
	querySumSpending := `
	SELECT ifnull(sum(amount), 0) AS sum
	FROM spending WHERE user_id = ?
	AND date  BETWEEN ? AND ?`

	// execute the query and scan the result into the `ValueSpending` field of the `stat` variable
	row = s.DB.QueryRowxContext(ctx, querySumSpending, b.UserID, b.StartDate, b.EndDate)
	err = row.StructScan(&stat.ValueSpending)
	if err != nil {
		return stat, err
	}

	// if there is any income for the given time period, calculate the percentage breakdown by income type
	if stat.ValueIncome.TotalAmount > 0 {

		// query to calculate the percentage breakdown of income types for the given user and time period
		queryIncomePercentage := `SELECT
			income_type AS type_id,
			sum(amount) AS 'total',
			(sum(amount) * 100.0) / ? AS 'percentage'
		FROM income
		WHERE
			user_id = ?
		AND
			date BETWEEN ? AND ?
		GROUP by income_type;`

		// execute the query and scan the results into the `Incomes` slice of the `ValueIncome` field of the `stat` variable
		rows, err := s.DB.QueryxContext(ctx,
			queryIncomePercentage,
			stat.ValueIncome.TotalAmount,
			b.UserID,
			b.StartDate,
			b.EndDate)
		if err != nil {
			return stat, err
		}

		for rows.Next() {
			v := model.Value{}
			err := rows.StructScan(&v)
			if err != nil {
				log.Println(err)
				return stat, err
			}
			stat.ValueIncome.Incomes = append(stat.ValueIncome.Incomes, v)
		}
	}
	// if there is any spending for the given time period, calculate the percentage breakdown by spending type
	if stat.ValueSpending.TotalAmount > 0 {
		// query to calculate the percentage breakdown of spending types for the given user and time period
		querySpendingPercentag := `
			SELECT
			spending_type AS type_id,
			sum(amount) AS 'total',
			(sum(amount) * 100.0) / ? AS 'percentage'
		FROM spending
		WHERE
			user_id = ?
		AND
			date BETWEEN ? AND ?
		GROUP by spending_type;`
		// execute the query and scan the results into the `Spendings` slice of the `ValueSpending` field of the `stat` variable
		rows, err := s.DB.QueryxContext(ctx,
			querySpendingPercentag,
			stat.ValueSpending.TotalAmount,
			b.UserID,
			b.StartDate,
			b.EndDate)
		if err != nil {
			return stat, err
		}

		for rows.Next() {
			v := model.Value{}
			err := rows.StructScan(&v)
			if err != nil {
				return stat, err
			}
			stat.ValueSpending.Spendings = append(stat.ValueSpending.Spendings, v)
		}
	}

	return stat, nil
}
