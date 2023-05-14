package handlers_financial

import (
	"diplomka/internal/model"
	"encoding/json"
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

// This function handles the HTTP POST request for adding a new spending record to the database. Here's a breakdown of what it does:
func (s *financial) PostSpending(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	spen := model.Spending{}

	spen.UserID = middleware.GetUserID(r)

	err := json.NewDecoder(r.Body).Decode(&spen)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if err := spen.Validate(); err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	_, err = s.InsertSpendingService(r.Context(), spen)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}
