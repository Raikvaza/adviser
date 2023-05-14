package service_auth

import (
	"context"
	"fmt"
)

// Delete deletes the user with the specified userID from the database.
// It receives a context.Context and the userID (int64) to be deleted as input parameters.
// It returns an error if there was a problem deleting the user.
// If the user was successfully deleted, it returns nil.
func (a *auth) Delete(ctx context.Context, userID int64) error {
	err := a.UserRepo.DeleteUser(ctx, userID)
	if err != nil {
		return fmt.Errorf("error deleting user %d: %v", userID, err)
	}
	return nil
}
