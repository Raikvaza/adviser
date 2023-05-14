package handlers_financial

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	middleware "diplomka/internal/handlers/handlers_middleware"
	"diplomka/internal/model"
)

func (f *financial) GetPlanner(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userID := middleware.GetUserID(r)

	if userID <= 0 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	b := model.Between{}

	b.UserID = middleware.GetUserID(r)
	now := model.CustomTime{
		Time: time.Now(),
	}
	b.EndDate = now
	b.StartDate = now.FirstDayOfMonth()

	// b, err := getFilter(r)
	// if err != nil {
	// 	http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	// 	return
	// }

	planers, err := f.FinancialTrackerService.GetPlanner(r.Context(), b)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(planers)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}

func (f *financial) PostPlanner(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	planner := model.SpendingPlanner{}

	planner.UserID = middleware.GetUserID(r)

	err := json.NewDecoder(r.Body).Decode(&planner)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if err := planner.Validate(); err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	err = f.AddSpendingPlanner(r.Context(), planner)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
