package handlers

import (
	"net/http"

	"diplomka/internal/handlers/handlers_avatar"
	"diplomka/internal/model"

	"github.com/gorilla/mux"
)

func InitAvatarHandlers(r *mux.Router, m middleware, ava model.AvatarService) {
	handlers := handlers_avatar.NewAvatarHandlers(ava)
	s := r.PathPrefix("").Subrouter()
	// fs := http.FileServer(model.NewFileSystem(http.Dir("./static/images/")))
	fs := http.FileServer(model.NewFileSystem(http.Dir("./static/images")))

	s.PathPrefix("/images/").Handler(http.StripPrefix("/images/", fs))
	s.HandleFunc("/images", handlers.GetFoto).Methods(http.MethodGet)
	s.HandleFunc("/images", handlers.UploadFoto).Methods(http.MethodPost)
	s.HandleFunc("/images", handlers.DeleteFoto).Methods(http.MethodDelete)
	s.Use(m.RequireAuthentication)
}
