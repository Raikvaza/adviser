package log

import (
	"log"
	"os"
)

var (
	infoLog  = log.New(os.Stdout, "\033[33m[INFO]\033[0m\t", log.LstdFlags|log.Lshortfile)
	errorLog = log.New(os.Stdout, "\033[31m[ERROR]\033[0m\t", log.LstdFlags|log.Lshortfile)
	panicLog = log.New(os.Stdout, "\033[31m[PANIC]\033[0m\t", log.LstdFlags|log.Lshortfile)
)

func NewErrorLog() *log.Logger {
	return errorLog
}

func Print(v ...any) {
	infoLog.Print(v...)
}

func Println(v ...any) {
	infoLog.Println(v...)
}

func Printf(format string, v ...any) {
	infoLog.Printf(format, v...)
}

func Fatal(v ...any) {
	errorLog.Fatal(v...)
}

func Fatalln(v ...any) {
	errorLog.Fatalln(v...)
}

func Fatalf(format string, v ...any) {
	errorLog.Fatalf(format, v...)
}

func Panic(v ...any) {
	panicLog.Panic(v...)
}

func Panicln(v ...any) {
	panicLog.Panicln(v...)
}

func Panicf(format string, v ...any) {
	panicLog.Panicf(format, v...)
}
