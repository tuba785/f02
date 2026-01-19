import axios from "axios";
import type { User } from "../types/User";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
};
