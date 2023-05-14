package handlers

import (
	"net/http"

	"diplomka/internal/handlers/handlers_financial"
	"diplomka/internal/model"

	"github.com/gorilla/mux"
)

type middleware interface {
	RequireAuthentication(next http.Handler) http.Handler
}

func InitFinancialHandlers(r *mux.Router, m middleware, fs model.FinancialTrackerService) {
	handlers := handlers_financial.NewFinancialHandlers(fs)

	s := r.PathPrefix("").Subrouter()

	s.HandleFunc("/budget/type", handlers.AllIncomeTypes).Methods(http.MethodGet)
	s.HandleFunc("/debt/type", handlers.GetAllLoanDebtType).Methods(http.MethodGet)

	s.HandleFunc("/spending", handlers.PostSpending).Methods(http.MethodPost)
	s.HandleFunc("/income", handlers.PostIncome).Methods(http.MethodPost)

	s.HandleFunc("/debt", handlers.AddLoanDebt).Methods(http.MethodPost)
	s.HandleFunc("/debt", handlers.GetLoanDebt).Methods(http.MethodGet)

	s.HandleFunc("/budget/stats", handlers.GetIncomeSpending).Methods(http.MethodGet)

	s.HandleFunc("/statistics", handlers.GetStat).Methods(http.MethodGet)

	s.HandleFunc("/planner", handlers.GetPlanner).Methods(http.MethodGet)
	s.HandleFunc("/planner", handlers.PostPlanner).Methods(http.MethodPost)

	s.Use(m.RequireAuthentication)
}
