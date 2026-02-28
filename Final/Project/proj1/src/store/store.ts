import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
