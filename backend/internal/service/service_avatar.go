package service

import (
	"context"
	"diplomka/internal/model"
	"fmt"
	"os"
)

type avatar struct {
	model.UserRepo
}

func NewAvatarService(ur model.UserRepo) *avatar {
	return &avatar{
		UserRepo: ur,
	}
}

// AddUserImage adds a user image to the database using the UserRepo interface
func (a *avatar) AddUserImage(ctx context.Context, info model.UserImage) (*model.UserImage, error) {
	image, err := a.UserRepo.AddUserImage(ctx, info)
	if err != nil {
		return nil, fmt.Errorf("error occurred from UserRepo AddUserImage: %v", err)
	}
	return image, nil
}

// GetUserImageService gets a user image from the database using the UserRepo interface
func (a *avatar) GetUserImageService(ctx context.Context, id int64) (*model.UserImage, error) {
	info, err := a.UserRepo.GetUserImage(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("error occurred from UserRepo GetUserImage: %v", err)
	}
	return info, nil
}

// GetUserInfoService gets a user from the database using the UserRepo interface
func (a *avatar) GetUserInfoService(ctx context.Context, id int) (*model.User, error) {
	user, err := a.UserRepo.GetUser(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("error occurred from UserRepo GetUser: %v", err)
	}
	return user, nil
}

// DeleteImageService deletes a user image from the database and the static/images folder
func (a *avatar) DeleteImageService(ctx context.Context, id int64) error {
	ImgName, err := a.UserRepo.GetUserImage(ctx, id)
	if err != nil {
		return fmt.Errorf("error occurred from UserRepo GetUserImage: %v", err)
	}

	// Construct image path
	path := "./static/images/" + ImgName.ImageName

	// Remove image from static/images folder
	err = os.Remove(path)
	if err != nil {
		return err
	}

	// Delete image from database
	err = a.UserRepo.DeleteImage(ctx, id)
	if err != nil {
		return fmt.Errorf("error occurred from UserRepo DeleteImage: %v", err)
	}
	return nil
}
