package handlers_avatar

import (
	"bytes"
	"diplomka/internal/model"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	middleware "diplomka/internal/handlers/handlers_middleware"

	"github.com/google/uuid"
)

// UploadFoto handles the upload of an avatar image for a user

func (a *avatar) UploadFoto(w http.ResponseWriter, r *http.Request) {
	var imageData model.ImageData
	err := json.NewDecoder(r.Body).Decode(&imageData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Remove the Data URL prefix
	dataURLPrefixIndex := strings.Index(imageData.Data, ",")
	if dataURLPrefixIndex < 0 {
		http.Error(w, "Invalid base64 data format", http.StatusBadRequest)
		return
	}
	base64Data := imageData.Data[dataURLPrefixIndex+1:]

	userID := middleware.GetUserID(r)

	imagename := uuid.New().String() + ".jpg"

	info := model.UserImage{
		UserID:    userID,
		ImageName: imagename,
	}

	_, err = a.AddUserImage(r.Context(), info)
	if err != nil {
		fmt.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	file, err := os.Create(filepath.Join("./static/images/", imagename))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Decode the image data
	decoded, err := base64.StdEncoding.DecodeString(base64Data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Write the decoded image data to the file
	_, err = io.Copy(file, bytes.NewReader(decoded))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response status and write the image name as response body
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(imagename)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// w.Write([]byte(imagename))
}
