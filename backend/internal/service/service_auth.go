package service

import (
	"diplomka/internal/model"
	"diplomka/internal/service/service_auth"
	service_jwt "diplomka/internal/service/service_fwt"
)

type auth struct {
	model.AuthenticationService
}

func NewAuthenticationService(ur model.UserRepo) model.AuthService {
	jw := service_jwt.NewJWTService()
	return &auth{
		AuthenticationService: service_auth.NewAuthService(ur, jw),
	}
}
