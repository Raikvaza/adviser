package handlers_financial

import (
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"
)

// GetAllLoanDebtType retrieves all loan and debt types from the database and returns them as a JSON response.

func (f *financial) GetAllLoanDebtType(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Call the GetAllLoanDebtTypeService method to get all loan and debt types
	obj, err := f.GetAllLoanDebtTypeService(r.Context())
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// Encode the response object as JSON and write it to the response writer
	err = json.NewEncoder(w).Encode(obj)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
