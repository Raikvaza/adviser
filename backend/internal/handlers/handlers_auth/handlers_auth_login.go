package handlers_auth

import (
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"encoding/json"
	"net/http"
)

func (a *auth) LogIn(w http.ResponseWriter, r *http.Request) {
	// Set the response content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Create an empty Authentication struct and decode the request body into it
	auth := model.Authentication{}
	err := json.NewDecoder(r.Body).Decode(&auth)
	if err != nil {
		log.Printf("json decode: %v", err)
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	// Validate the Authentication struct (optional)
	// if err := auth.Validate(); err != nil {
	// 	http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	// 	return
	// }

	// Call the LogIn method of the AuthService to log in the user and get a token
	token, err := a.AuthService.LogIn(r.Context(), auth)
	if err != nil {
		log.Printf("login service: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// Encode the token into JSON and write it to the response body
	err = json.NewEncoder(w).Encode(token)
	if err != nil {
		log.Println("encode: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}
