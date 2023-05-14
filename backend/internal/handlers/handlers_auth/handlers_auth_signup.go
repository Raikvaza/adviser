package handlers_auth

import (
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"
)

// SignUp registers a new user.
// It expects a JSON object representing the user in the request body.
// It returns an HTTP 400 error if the request body is malformed or the user is invalid.
// It returns an HTTP 500 error if the registration process fails.

func (a *auth) SignUp(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Content-Type", "application/json")
	user := model.User{}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Printf("json decode: %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if err := user.Validate(); err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	if err := a.AuthService.SignUp(r.Context(), user); err != nil {
		log.Printf("service SignUp: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
