package main

import (
	"diplomka/internal/handlers"
	"diplomka/internal/repository"
	"diplomka/internal/service"
	"diplomka/pkg/sqlite"
	"log"
	"net/http"
	"time"

	middleware "diplomka/internal/handlers/handlers_middleware"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

// Defines the port number that the server will listen on.
const port = "8080"

func main() {
	// Connects to a SQLite database using the Connect function from the sqlite package.
	// If an error occurs, the program exits with a fatal log message.
	db, err := sqlite.Connect("./db/data.db")
	if err != nil {
		log.Fatalf("db connect: %v", err)
	}
	// Closes the database connection using defer and checks if the database is responsive by calling the Ping function from the database/sql
	// package. If an error occurs, the program exits with a fatal log message.
	defer db.Close()
	if err := db.Ping(); err != nil {
		log.Fatalln(err)
	}

	// Enables foreign key support in the SQLite database.
	if _, err := db.Exec(`PRAGMA foreign_keys = ON;`); err != nil {
		log.Fatalln(err)
	}
	// Creates a new repository using the NewRepository function from the repository package and passing in the database connection.
	repo := repository.NewRepository(db)
	// Creates new authentication, financial tracker, and avatar services using the NewAuthenticationService, NewFinancialTrackerService, and
	// NewAvatarService functions from the service package, respectively. The services are initialized with the repository.
	authService := service.NewAuthenticationService(repo)
	finansService := service.NewFinancialTrackerService(repo)
	avatarService := service.NewAvatarService(repo)
	// Creates a new Gorilla mux router.
	r := mux.NewRouter()
	// Creates a new middleware using the NewMiddleware function from the middleware package and passing in the authentication service.
	m := middleware.NewMiddleware(authService)
	// Initializes the authentication, financial tracker, and avatar handlers using the InitAuthHandlers, InitFinancialHandlers, and InitAvatarHandlers
	// functions from the handlers package, respectively. Each handler is initialized with the mux router, middleware, and corresponding service.
	handlers.InitAuthHandlers(r, m, authService)
	handlers.InitFinancialHandlers(r, m, finansService)
	handlers.InitAvatarHandlers(r, m, avatarService)

	// Adds a panic recovery middleware to the router.
	r.Use(m.PanicRecover)

	// Creates an HTTP server using the http.Server struct and specifying the server address, router, and read/write timeout.
	server := http.Server{
		Addr:         ":" + port,
		Handler:      r,
		WriteTimeout: 5 * time.Second,
		ReadTimeout:  5 * time.Second,
	}

	log.Printf("Starting listener on http://localhost:%s", port)
	// Logs a message indicating that the server is starting, and starts the server using the ListenAndServe function.
	// If an error occurs, the program exits with a fatal log message.
	err = server.ListenAndServe()
	log.Fatalf("Server error: %v", err)
}
