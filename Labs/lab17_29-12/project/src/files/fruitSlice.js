import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedValues: [],
  fruits: [
    {
      id: 1,
      name: "alma",
    },
    {
      id: 2,
      name: "banan",
    },
    {
      id: 3,
      name: "uzum",
    },
  ],
};

export const fruitsSlice = createSlice({
  name: "fruits",
  initialState: initialState,
  reducers: {
    selectAll: (state) => {
      state.selectedValues = [...state.fruits];
    },
    toggleFruit: (state, action) => {
      const isExsisted = state.selectedValues.find(
        (item) => item.id === action.payload.id
      );
      if (isExsisted) {
        state.selectedValues = state.selectedValues.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selectedValues.push(action.payload);
      }
    },
    deleteAll: (state) => {
      state.selectedValues = [];
    },
  },
});

export const { selectAll, toggleFruit, deleteAll } = fruitsSlice.actions;

export default fruitsSlice.reducer;
