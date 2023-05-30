import { configureStore } from "@reduxjs/toolkit";
import topratedSlice from "./topratedSlice";
import popularSlice from "./popularSlice";
import filterSlice from "./filterSlice";
import bannerSlice from "./bannerSlice";
import trendingSlice from "./trendingSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    banner: bannerSlice,
    popular: popularSlice,
    trending: trendingSlice,
    toprated: topratedSlice,
    serchresult: searchSlice,
    filter:filterSlice,

  }
});
