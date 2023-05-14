package handlers_avatar

import (
	"encoding/json"
	"net/http"

	middleware "diplomka/internal/handlers/handlers_middleware"
)

type image struct {
	Name string `json:"name"`
}

// GetFoto retrieves the profile picture of the authenticated user
func (a *avatar) GetFoto(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r)
	picName, err := a.GetUserImageService(r.Context(), userID)
	if err != nil {
		// Check for the custom error
		if err.Error() == "error was ocured from UserRepo GetUserImage: no avatar found for user" { // Check for the custom error
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte("No avatar found for user"))
			return
		}
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(image{
		Name: picName.ImageName,
	})
}
