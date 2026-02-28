import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookService } from "../../services/bookService";
import type { Book } from "../../types/book";

export interface BooksState {
  items: Book[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  loading: "idle",
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const books = await bookService.fetchBooks();
      return books;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch books",
      );
    }
  },
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;
