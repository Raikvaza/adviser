package service_auth

import "diplomka/internal/model"

type auth struct {
	model.UserRepo
	model.JWTService
}

func NewAuthService(ur model.UserRepo, jw model.JWTService) model.AuthService {
	return &auth{
		UserRepo:   ur,
		JWTService: jw,
	}
}

