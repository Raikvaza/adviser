package model

import (
	"database/sql/driver"
	"fmt"
	"time"
)

type CustomTime struct {
	time.Time
}

func (t CustomTime) FirstDayOfMonth() CustomTime {
	firstOfMonth := time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, t.Location())
	return CustomTime{firstOfMonth}
}

func (t CustomTime) FirstDayOfYear() CustomTime {
	year, _, _ := t.Date()
	firstOfYear := time.Date(year, 1, 1, 0, 0, 0, 0, t.Location())
	return CustomTime{firstOfYear}
}

func (c CustomTime) FirstDayOfWeek() CustomTime {
	weekday := c.Weekday()
	daysSinceMonday := int(weekday - time.Monday)
	if daysSinceMonday < 0 {
		daysSinceMonday += 7
	}
	return CustomTime{c.Time.AddDate(0, 0, -daysSinceMonday)}
}

func (t CustomTime) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf(`"%s"`, t.Format("2006-01-02"))), nil
}

func (t *CustomTime) UnmarshalJSON(b []byte) error {
	parsedTime, err := time.Parse(`"2006-01-02"`, string(b))
	if err != nil {
		return err
	}
	t.Time = parsedTime
	return nil
}

func (ct *CustomTime) Scan(value interface{}) error {
	if value == nil {
		ct.Time = time.Time{}
		return nil
	}
	t, ok := value.(time.Time)
	if !ok {
		return fmt.Errorf("invalid type %T for CustomTime", value)
	}
	ct.Time = t
	return nil
}

func (ct CustomTime) Value() (driver.Value, error) {
	return ct.Time.Format("2006-01-02"), nil
}
