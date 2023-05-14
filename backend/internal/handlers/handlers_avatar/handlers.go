package handlers_avatar

import "diplomka/internal/model"

type avatar struct {
	model.AvatarService
}

func NewAvatarHandlers(ava model.AvatarService) *avatar {
	return &avatar{
		AvatarService: ava,
	}
}
