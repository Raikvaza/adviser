package handlers_auth

import "diplomka/internal/model"

type auth struct {
	model.AuthService
}

func NewAuthHandlers(as model.AuthService) *auth {
	return &auth{
		AuthService: as,
	}
}
