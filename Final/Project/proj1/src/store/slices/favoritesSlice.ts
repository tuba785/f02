import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  ids: string[];
}

const loadFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem("favoriteBookIds");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const saveFavorites = (ids: string[]) => {
  localStorage.setItem("favoriteBookIds", JSON.stringify(ids));
};

const initialState: FavoritesState = {
  ids: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.ids.indexOf(id);
      if (idx === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(idx, 1);
      }
      saveFavorites(state.ids);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      saveFavorites(state.ids);
    },
    clearAllFavorites: (state) => {
      state.ids = [];
      saveFavorites(state.ids);
    },
  },
});

export const { toggleFavorite, removeFavorite, clearAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
