package middleware

import (
	"context"
	"diplomka/internal/model"
	"diplomka/pkg/log"
	"net/http"
)

type key string

var UserKey key = "userID"

type middleware struct {
	model.AuthService
}

func NewMiddleware(a model.AuthService) *middleware {
	return &middleware{
		AuthService: a,
	}
}

// PanicRecover: This middleware function is used to recover
// from any panics that occur in subsequent middleware or handlers. It returns an
// http.Handler that wraps the next http.Handler function. The defer function is used to recover
// from any panics that occur during the execution of next. If a panic occurs, it sets the connection header
// to "close", writes an http.StatusInternalServerError response code to the client, and returns.

func (m *middleware) PanicRecover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				w.Header().Set("Connection", "close")
				http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
				return
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// RequireAuthentication: This middleware function is used to ensure that a request is authenticated before it can proceed.
// It returns an http.Handler that wraps the next http.Handler function.
// It checks for the "Authorization" header in the request and extracts the token.
// It then calls the Verification method of the AuthService to verify the token and obtain the user ID.
// If the token is invalid or verification fails, it writes an http.StatusUnauthorized response code to the client and returns.
// If the token is valid and verification succeeds, it adds the user ID to the context of the request and calls the next
// http.Handler function with the modified request.
func (m *middleware) RequireAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, ok := r.Header["Authorization"]
		if !ok {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		userID, err := m.AuthService.Verification(token[0])
		if err != nil {
			log.Println(err)
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserKey, userID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetUserID: This function is used to retrieve the user ID from the context of a request.
// It takes a request as its parameter and returns the user ID if it exists in the context. If it does not exist, it returns 0.
func GetUserID(r *http.Request) int64 {
	userID, ok := r.Context().Value(UserKey).(int64)
	if !ok {
		return 0
	}
	return userID
}
