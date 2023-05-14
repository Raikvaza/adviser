package service_auth

import (
	"context"
	"diplomka/internal/model"
)

// Profile retrieves the profile information for a given user ID.
// It takes a context and a user ID as input and returns a model.Profile and an error.
// If the user with the given ID is not found, it returns an error.

func (a *auth) Profile(ctx context.Context, userId int64) (model.Profile, error) {
	profile := model.Profile{}
	// Get user from user repository by user ID
	user, err := a.UserRepo.GetUser(ctx, int(userId))
	if err != nil {
		return profile, err
	}
	// Populate the profile fields with the user information
	profile.ID = user.ID
	profile.Name = user.Name
	profile.Surname = user.Surname
	profile.Email = user.Email

	return profile, nil
}
