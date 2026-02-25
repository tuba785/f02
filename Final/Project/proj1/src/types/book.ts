export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  cover: string;
  rating: number;
  comments_count: number;
  likes_count: number;
  publisher: string;
  release_date: string;
  discount: number | null;
  discounted_price: number;
  language: string;
  page_count: number;
  isbn: string;
  format: string;
  is_bestseller: boolean;
  genre: string;
}
