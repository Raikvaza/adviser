package handlers

import (
	"net/http"

	"diplomka/internal/handlers/handlers_auth"
	"diplomka/internal/model"

	"github.com/gorilla/mux"
)

func InitAuthHandlers(r *mux.Router, m middleware, as model.AuthService) {
	handler := handlers_auth.NewAuthHandlers(as)

	r.HandleFunc("/signup", handler.SignUp).Methods(http.MethodPost)
	r.HandleFunc("/login", handler.LogIn).Methods(http.MethodPost)

	s := r.PathPrefix("").Subrouter()

	s.HandleFunc("/profile", handler.Profile).Methods(http.MethodGet)
	s.HandleFunc("/profile", handler.Delete).Methods(http.MethodDelete)
	s.Use(m.RequireAuthentication)
}
