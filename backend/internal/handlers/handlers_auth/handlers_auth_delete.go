package handlers_auth

import (
	"diplomka/pkg/log"
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

// This function handles the HTTP request for deleting a user's account.
// It uses the GetUserID function from the middleware package to retrieve the user ID from the request context and
// calls the Delete method of the AuthService to delete the user account. If any errors occur,
// it returns an appropriate HTTP error response.
func (a *auth) Delete(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)

	if userID <= 0 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	err := a.AuthService.Delete(r.Context(), userID)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
