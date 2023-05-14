package service_auth

import (
	"context"
	"diplomka/internal/model"
	"fmt"
)

// LogIn function logs in a user by verifying their credentials and generating a JWT token for them.
// It takes in a context and an Authentication struct containing the user's login information.
// It returns a Token and an error if any.
func (a *auth) LogIn(ctx context.Context, auth model.Authentication) (*model.Token, error) {
	user, err := a.UserRepo.GetUserforAuth(ctx, auth)
	if err != nil {
		return nil, fmt.Errorf("error was ocured from UserRepo GetUserforAuth: %v", err)
	}

	token, err := a.JWTService.GenerateJWT(ctx, *user)
	if err != nil {
		return nil, err
	}

	return token, nil
}
