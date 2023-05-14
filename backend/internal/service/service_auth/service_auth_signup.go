package service_auth

import (
	"context"
	"diplomka/internal/model"
	"fmt"
)

// SignUp is a function that handles the registration of a new user.
// It receives a context and a User struct containing the user information.
// It returns an error if the user registration fails, otherwise it returns nil.

func (a *auth) SignUp(ctx context.Context, user model.User) error {
	_, err := a.UserRepo.AddUser(ctx, user)
	if err != nil {
		return fmt.Errorf("user repo AddUser: %v", err)
	}
	return nil
}
