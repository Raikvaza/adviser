package handlers_auth

import (
	"encoding/json"
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

// Profile handles the GET request to retrieve the profile information of a logged-in user
// It extracts the user ID from the request context using the middleware GetUserID function
// If the user ID is not valid, it returns a bad request error
// It calls the Profile method of the AuthService to get the user profile
// If an error occurs while fetching the profile, it returns an internal server error
// Otherwise, it encodes the profile in JSON format and writes it to the response
// If an error occurs while encoding the profile, it returns an internal server error
func (a *auth) Profile(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)

	if userID <= 0 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	profile, err := a.AuthService.Profile(r.Context(), userID)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(profile)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
