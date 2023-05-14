package model

type Token struct {
	UserID      int64  `json:"user_id"`
	UserName    string `json:"user_name"`
	TokenString string `json:"token"`
}
