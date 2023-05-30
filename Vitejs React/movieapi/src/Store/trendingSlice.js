import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

export const fetchTrending = createAsyncThunk(
  "trendings/fetch",
  async ({ DayorWeek }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MThiZjAxNGZjNzc4ZDk5MTdmYzRiOTAxOTFmODAyMSIsInN1YiI6IjYwOTBjMzM5ZjZmZDE4MDAyYTAwOGY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L8yuJmX3xWQi-FTdIVHiE6hZpJym2eKj5TfEqr_TsEY",
      },
    };

    const totalPages = 2;

    const results = [];
    for (let page = 1; page <= totalPages; page++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/${DayorWeek}?page=${page}`,
        options
      );
      const data = await res.json();

      results.push(...data.results);
    }

    const filteredMovies = results.filter((movie) => movie.vote_average >= 6);

    return filteredMovies;
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default trendingSlice.reducer;
