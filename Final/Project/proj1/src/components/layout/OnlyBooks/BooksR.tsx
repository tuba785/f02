import { useEffect, useMemo, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useBooks } from "../../../hooks/useBooks";
import BooksSorting, { type SortingState } from "./BooksSorting";
import BooksList from "./BooksList";
import BooksPartNav from "./BooksPartNav";
import type { Book } from "../../../types/book";

const ITEMS_PER_PAGE = 4;

/* ─── Sorting helpers ─── */
const sortBooks = (books: Book[], sort: string): Book[] => {
  const list = [...books];
  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    case "oldest":
      return list.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
    case "price-high":
      return list.sort((a, b) => b.discounted_price - a.discounted_price);
    case "price-low":
      return list.sort((a, b) => a.discounted_price - b.discounted_price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "likes":
      return list.sort((a, b) => b.likes_count - a.likes_count);
    default:
      return list;
  }
};

const filterByEra = (books: Book[], era: string): Book[] => {
  return books.filter((b) => {
    const year = new Date(b.release_date).getFullYear();
    if (era === "1900-1999") return year >= 1900 && year <= 1999;
    return year >= 2000;
  });
};

const BooksR = () => {
  const { books, loading, error, getBooks } = useBooks();
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>({
    era: "1900-1999",
    view: "list",
    sort: "newest",
  });

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  /* Filter → Sort → Paginate */
  const processed = useMemo(() => {
    const filtered = filterByEra(books, sorting.era);
    return sortBooks(filtered, sorting.sort);
  }, [books, sorting.era, sorting.sort]);

  const totalItems = processed.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  /* Reset page to 1 when filters change */
  const handleSortChange = (state: SortingState) => {
    setSorting(state);
    setPage(1);
  };

  /* Clamp page */
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const pageBooks = processed.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Flex direction="column" gap={5} w="full" maxW="1200px" mx="auto">
      <BooksSorting onChange={handleSortChange} />
      <BooksList books={pageBooks} loading={loading} error={error} />
      {loading !== "pending" && !error && totalItems > 0 && (
        <BooksPartNav
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      )}
    </Flex>
  );
};

export default BooksR;
