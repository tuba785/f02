import axios from "axios";
import type { Book } from "../types/book";

const API_URL = "https://699ec8af78dda56d396b55cf.mockapi.io/api/v1/books";

const axiosInstance = axios.create({
  timeout: 10000,
});

export const bookService = {
  fetchBooks: async (): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get<Book[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  fetchBookById: async (id: string): Promise<Book> => {
    try {
      const response = await axiosInstance.get<Book>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  },
};
