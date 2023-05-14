package handlers_avatar

import (
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

func (a *avatar) DeleteFoto(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the request context
	userID := middleware.GetUserID(r)

	// Return an error if the user ID is invalid
	if userID < 1 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	// Call the DeleteImageService method of the AvatarService to delete the user's avatar
	err := a.AvatarService.DeleteImageService(r.Context(), userID)
	if err != nil {

		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
