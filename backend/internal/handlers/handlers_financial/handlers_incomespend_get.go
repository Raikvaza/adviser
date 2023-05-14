package handlers_financial

import (
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"
)

func (f *financial) GetIncomeSpending(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Get filter from query parameters
	bet, err := getFilter(r)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	// Retrieve income and spending data using the filter

	inc, err := f.GetIncomeService(r.Context(), bet)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	spen, err := f.GetSpendingService(r.Context(), bet)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// Merge the income and spending data into a single struct
	mergerstruct := model.Income_Spending{
		Income:   inc,
		Spending: spen,
	}

	// Encode the merged struct and send it in the response
	err = json.NewEncoder(w).Encode(mergerstruct)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
