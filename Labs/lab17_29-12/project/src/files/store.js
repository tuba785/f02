import { configureStore } from "@reduxjs/toolkit";
import fruitReducer from "./fruitSlice";

export const store = configureStore({
  reducer: {
    fruits: fruitReducer,
  },
});
