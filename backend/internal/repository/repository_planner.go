package repository

import (
	"context"
	"database/sql"

	"diplomka/internal/model"
)

func (r *repo) AddPlannerSpending(ctx context.Context, planner model.SpendingPlanner) error {
	query := `INSERT INTO planner (user_id, spending_type_id, amount)
	VALUES (:user_id, :spending_type_id, :amount)
	ON CONFLICT (user_id, spending_type_id)
	DO UPDATE SET amount = EXCLUDED.amount;`

	res, err := r.DB.NamedExecContext(ctx, query, planner)
	if err != nil {
		return err
	}
	count, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if count <= 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *repo) GetPlanner(ctx context.Context, bet model.Between) (map[int]model.Planner, error) {
	// query := `
	// SELECT spendingtype.id, COALESCE(planner.amount, 0) as 'amount', COALESCE(spending.amount, 0) as 'spending'
	// FROM spendingtype
	// LEFT JOIN (
	//   SELECT *
	//   FROM spending
	//   WHERE spending.user_id = :user_id AND spending.date BETWEEN :start_date AND :end_date
	// ) AS spending ON spending.spending_type = spendingtype.id
	// LEFT JOIN (
	//   SELECT *
	//   FROM planner
	//   WHERE planner.user_id = :user_id
	// ) AS planner ON planner.spending_type_id = spendingtype.id
	// GROUP BY spendingtype.spending_type
	// ORDER BY spendingtype.id;`

	query := `SELECT spendingtype.id, COALESCE(planner.amount, 0) as 'amount', COALESCE(SUM(spending.amount), 0) as 'spending'
	FROM spendingtype
	LEFT JOIN planner ON planner.spending_type_id = spendingtype.id AND planner.user_id = :user_id
	LEFT JOIN spending ON spending.spending_type = spendingtype.id AND spending.user_id = :user_id AND spending.date BETWEEN :start_date AND :end_date
	GROUP BY spendingtype.id
	ORDER BY spendingtype.id;`

	rows, err := r.DB.NamedQueryContext(ctx, query, bet)
	if err != nil {
		return nil, err
	}

	planners := make(map[int]model.Planner)

	for rows.Next() {
		p := model.Planner{}
		var spendingTypeID int
		err := rows.Scan(&spendingTypeID, &p.Amount, &p.Spending)
		if err != nil {
			return nil, err
		}

		p.Difference = p.Amount - p.Spending
		planners[int(spendingTypeID)] = p
	}

	return planners, nil
}
