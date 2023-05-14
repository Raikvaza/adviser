package service_statistics

import (
	"context"
	"fmt"

	"diplomka/internal/model"
)

type stat struct {
	model.StatisticsRepo
}

func New(s model.StatisticsRepo) *stat {
	return &stat{
		StatisticsRepo: s,
	}
}

// GetStatistics retrieves the statistics for a given time period specified in the Between struct
// and returns a Statistics object along with an error (if any)
// It calls the GetStatistics method of StatisticsRepo to fetch the statistics from the database.
// If there is an error while fetching the statistics, it returns an error with a message that includes the error message.
// It then updates the EndDate and StartDate of the returned Statistics object with the corresponding fields from the input Between struct.
func (s *stat) GetStatistics(ctx context.Context, b model.Between) (model.Statistics, error) {
	st, err := s.StatisticsRepo.GetStatistics(ctx, b)
	if err != nil {
		return st, fmt.Errorf("get statistics: %v", err)
	}
	st.EndDate = b.EndDate
	st.StartDate = b.StartDate
	return st, nil
}
