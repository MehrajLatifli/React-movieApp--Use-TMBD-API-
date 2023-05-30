import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

export const fetchBanner = createAsyncThunk('banners/fetch', async ({MoviesorTv}) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MThiZjAxNGZjNzc4ZDk5MTdmYzRiOTAxOTFmODAyMSIsInN1YiI6IjYwOTBjMzM5ZjZmZDE4MDAyYTAwOGY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L8yuJmX3xWQi-FTdIVHiE6hZpJym2eKj5TfEqr_TsEY'

        },

    };

    const res = await fetch(`https://api.themoviedb.org/3/${MoviesorTv}/popular?page=1`, options);
    const data = await res.json();

    const ageAsInt = parseInt(1);



    return data;
});

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  }
});

export const selectRandomBanner = (state) => {
  const { data } = state.banner;


  const filteredMovies = data.filter((movie) => movie.vote_average > 6);


  if (filteredMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    return filteredMovies[randomIndex];
  }
  return null;
};

export default bannerSlice.reducer;
