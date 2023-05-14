package handlers_financial

import (
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

// This is a function to handle HTTP POST requests to add a new loan or debt record to the database

func (f *financial) AddLoanDebt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	ast := model.Loan_Debt{}

	ast.UserID = middleware.GetUserID(r)
	err := json.NewDecoder(r.Body).Decode(&ast)
	if err != nil {
		log.Printf("json decode: %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if err := ast.Validate(); err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	_, err = f.AddLoanDebtService(r.Context(), ast)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}

// This function retrieves loan and debt data based on a filter, and then merges them into a single response struct.
// It sets the content type header to application/json, extracts the filter from the request using the getFilter helper function,
// and calls the GetLoanDebtService method to retrieve the loan and debt data.

func (f *financial) GetLoanDebt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	bet, err := getFilter(r)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	loan, debt, err := f.GetLoanDebtService(r.Context(), bet)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	mergestruct := model.MergeStruct{
		LoanArr: loan,
		DebtArr: debt,
	}

	err = json.NewEncoder(w).Encode(mergestruct)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
