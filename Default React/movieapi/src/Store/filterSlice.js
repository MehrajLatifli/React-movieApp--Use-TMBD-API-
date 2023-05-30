import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

export const fetchFilter = createAsyncThunk(
  "populars/fetch",
  async ({ MoviesorTv, page, primary_release_year, sorts_by, with_genres, vote_average_lte }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MThiZjAxNGZjNzc4ZDk5MTdmYzRiOTAxOTFmODAyMSIsInN1YiI6IjYwOTBjMzM5ZjZmZDE4MDAyYTAwOGY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L8yuJmX3xWQi-FTdIVHiE6hZpJym2eKj5TfEqr_TsEY",
      },
    };

    const totalPages = page;

    const results = [];
    for (let page = 1; page <= totalPages; page++) {

      if (MoviesorTv === "movie") {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${MoviesorTv}?page=${page}&primary_release_year=${primary_release_year}&sort_by=${sorts_by}&vote_average.lte=${vote_average_lte}&with_genres=${with_genres}`, options);
        const data = await res.json();
        results.push(...data.results);
      }

      if (MoviesorTv === "tv") {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${MoviesorTv}?first_air_date_year=${primary_release_year}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sorts_by}&vote_average.lte=${vote_average_lte}&with_genres=${with_genres}`, options);
        const data = await res.json();

        results.push(...data.results);
      }

    }
    return results;
  }



  
);

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default filterSlice.reducer;
