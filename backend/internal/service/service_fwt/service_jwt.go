package service_jwt

import (
	"context"
	"diplomka/internal/model"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

var sampleSecretKey = []byte("SecretYouShouldHide")

type jwtService struct {
	model.JWTService
}

func NewJWTService() model.JWTService {
	return &jwtService{}
}

// The first function GenerateJWT takes a User object as an argument and generates a JWT (JSON Web Token) for that user. It does this by creating a new jwt.StandardClaims object, setting its Subject to the string representation of the user's ID, and its ExpiresAt field to the current time plus 24 hours. It then creates a new JWT using the jwt.NewWithClaims function, passing in the SigningMethodHS256 method and the StandardClaims object. The JWT is signed using a secret key, and the resulting signed token is returned as a string, along with the user ID and name, wrapped in a Token struct.
func (j *jwtService) GenerateJWT(ctx context.Context, user model.User) (*model.Token, error) {
	claims := jwt.StandardClaims{
		Subject:   strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString(sampleSecretKey)
	if err != nil {
		return nil, fmt.Errorf("error was ocured when creating token: %v", err)
	}

	return &model.Token{
		UserID:      user.ID,
		UserName:    user.Name,
		TokenString: signedToken,
	}, nil
}

// The second function Verification takes a signed token as a string and verifies its validity. It does this by parsing the token using the jwt.ParseWithClaims function, passing in the signed token, an empty StandardClaims object, and a key function. If the token is not valid, it returns an error. If it is valid, it extracts the user ID from the Subject field of the token's claims and returns it as an int64.
func (j *jwtService) Verification(signedToken string) (int64, error) {
	token, err := jwt.ParseWithClaims(signedToken, &jwt.StandardClaims{}, keyFunc)
	if err != nil {
		return 0, fmt.Errorf("fwt parse: %v", err)
	}

	if !token.Valid {
		return 0, fmt.Errorf("token is not valid")
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)
	if !ok {
		return 0, fmt.Errorf("invalid token")
	}

	userID, err := strconv.Atoi(claims.Subject)
	if err != nil {
		return 0, err
	}

	return int64(userID), nil
}

// The keyFunc function is used to verify the signature on the JWT. It checks that the signing method used is SigningMethodHMAC and returns the secret key used to sign the token.
func keyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	}

	return sampleSecretKey, nil
}
