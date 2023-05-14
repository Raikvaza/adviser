package handlers_financial

import (
	"encoding/json"
	"net/http"
)

// this function get statats from GetStatistics service
func (s *financial) GetStat(w http.ResponseWriter, r *http.Request) {
	b, err := getFilter(r)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	stat, err := s.GetStatistics(r.Context(), b)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(stat)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
