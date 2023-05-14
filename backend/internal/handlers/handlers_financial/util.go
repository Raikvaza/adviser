package handlers_financial

import (
	"errors"
	"net/http"
	"time"

	middleware "diplomka/internal/handlers/handlers_middleware"
	"diplomka/internal/model"
)

func getFilter(r *http.Request) (model.Between, error) {
	b := model.Between{}

	b.UserID = middleware.GetUserID(r)

	now := model.CustomTime{
		Time: time.Now(),
	}

	b.EndDate = now

	filter := r.URL.Query().Get("filter")

	switch filter {
	case "":
		fallthrough
	case "month":
		b.StartDate = now.FirstDayOfMonth()
	case "year":
		b.StartDate = now.FirstDayOfYear()
	case "week":
		b.StartDate = now.FirstDayOfWeek()
	case "day":
		b.StartDate = b.EndDate
	default:
		return b, errors.New("not correct filter")
	}

	if err := b.Validate(); err != nil {
		return b, err
	}

	return b, nil
}
