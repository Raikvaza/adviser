package handlers_financial

import (
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"
)

// AllIncomeTypes retrieves all available income and spending types from the database and sends them as JSON response.

func (f *financial) AllIncomeTypes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	inc_type, spn_type, err := f.GetAllIncomeSpendingService(r.Context())
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	// Merge income and spending types into a single struct
	mergestruct := model.IncomeSpendType{
		Type_income:   inc_type,
		Type_spending: spn_type,
	}

	err = json.NewEncoder(w).Encode(mergestruct)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
