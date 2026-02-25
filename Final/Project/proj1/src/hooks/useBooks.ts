import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchBooks } from "../store/slices/booksSlice";

export const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.items);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  const getBooks = () => {
    dispatch(fetchBooks());
  };

  return {
    books,
    loading,
    error,
    getBooks,
  };
};
