import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useBooks } from "../../../hooks/useBooks";
import BooksSorting, { type SortingState } from "./BooksSorting";
import BooksList from "./BooksList";
import BooksGallery from "./BooksGallery";
import BooksPartNav from "./BooksPartNav";
import BooksFilters, { type FiltersState } from "./BooksFilters";
import type { Book } from "../../../types/book";

const LIST_PER_PAGE = 4;
const GALLERY_PER_PAGE = 12;

const sortBooks = (books: Book[], sort: string): Book[] => {
  const list = [...books];
  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) =>
          parseDate(b.release_date).getTime() -
          parseDate(a.release_date).getTime(),
      );
    case "oldest":
      return list.sort(
        (a, b) =>
          parseDate(a.release_date).getTime() -
          parseDate(b.release_date).getTime(),
      );
    case "price-high":
      return list.sort((a, b) => b.discounted_price - a.discounted_price);
    case "price-low":
      return list.sort((a, b) => a.discounted_price - b.discounted_price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "likes":
      return list.sort((a, b) => b.likes_count - a.likes_count);
    case "none":
      return list.sort((a, b) => Number(a.id) - Number(b.id));
    default:
      return list;
  }
};

const parseDate = (raw: string): Date => {
  const parts = raw.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(raw);
};

const filterByEra = (books: Book[], era: string): Book[] => {
  if (era === "all") return books;
  return books.filter((b) => {
    const year = parseDate(b.release_date).getFullYear();
    if (era === "1900-1999") return year >= 1900 && year <= 1999;
    return year >= 2000;
  });
};

const applyFiltersToBooks = (books: Book[], f: FiltersState | null): Book[] => {
  if (!f) return books;
  let result = [...books];

  if (f.genres.length > 0) {
    result = result.filter((b) => f.genres.includes(b.genre));
  }
  if (f.formats.length > 0) {
    result = result.filter((b) => f.formats.includes(b.format));
  }
  if (f.languages.length > 0) {
    result = result.filter((b) => f.languages.includes(b.language));
  }
  if (f.years.length > 0) {
    result = result.filter((b) => {
      const year = String(parseDate(b.release_date).getFullYear());
      return f.years.includes(year);
    });
  }

  result = result.filter(
    (b) => b.discounted_price >= f.priceMin && b.discounted_price <= f.priceMax,
  );

  if (f.editorPick === "bestsellers") {
    result = result.filter((b) => b.is_bestseller);
  } else if (f.editorPick === "discounted") {
    result = result.filter((b) => b.discount !== null && b.discount > 0);
  } else if (f.editorPick === "most_likes") {
    result = [...result]
      .sort((a, b) => b.likes_count - a.likes_count)
      .slice(0, 10);
  } else if (f.editorPick === "most_comments") {
    result = [...result]
      .sort((a, b) => b.comments_count - a.comments_count)
      .slice(0, 10);
  }

  return result;
};

const BooksR = () => {
  const { books, loading, error, getBooks } = useBooks();
  const [searchParams] = useSearchParams();
  const urlGenre = searchParams.get("genre") || "";
  const urlSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<FiltersState | null>(null);
  const [sorting, setSorting] = useState<SortingState>({
    era: "all",
    view: "list",
    sort: "none",
  });

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [urlGenre, urlSearch]);

  const processed = useMemo(() => {
    let filtered = filterByEra(books, sorting.era);
    filtered = applyFiltersToBooks(filtered, activeFilters);

    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q),
      );
    }

    return sortBooks(filtered, sorting.sort);
  }, [books, sorting.era, sorting.sort, activeFilters, urlSearch]);

  const itemsPerPage =
    sorting.view === "gallery" ? GALLERY_PER_PAGE : LIST_PER_PAGE;

  const totalItems = processed.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handleSortChange = (state: SortingState) => {
    setSorting(state);
    setPage(1);
  };

  const handleFiltersApply = (f: FiltersState) => {
    setActiveFilters(f);
    setPage(1);
  };

  const handleFiltersReset = () => {
    setActiveFilters(null);
    setPage(1);
  };

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * itemsPerPage;
  const pageBooks = processed.slice(start, start + itemsPerPage);

  return (
    <Flex gap={6} w="full" maxW="1440px" mx="auto" align="start">
      <Flex direction="column" gap={4} w="260px" flexShrink={0}>
        <Text fontSize="22px" fontWeight="800" color="text.heading">
          Filter Option
        </Text>
        <BooksFilters
          key={urlGenre}
          initialGenres={urlGenre ? [urlGenre] : []}
          onChange={handleFiltersApply}
          onReset={handleFiltersReset}
        />
      </Flex>

      <Flex direction="column" gap={5} flex={1} minW={0} maxW="1148px">
        {urlSearch && (
          <Flex align="center" gap={2}>
            <Text fontSize="22px" fontWeight="800" color="text.heading">
              Search results for:
            </Text>
            <Text fontSize="22px" fontWeight="800" color="brand.purple">
              &quot;{urlSearch}&quot;
            </Text>
          </Flex>
        )}

        <Text fontSize="22px" fontWeight="800" color="text.heading">
          Books
        </Text>

        <BooksSorting onChange={handleSortChange} />

        {sorting.view === "gallery" ? (
          <BooksGallery books={pageBooks} loading={loading} error={error} />
        ) : (
          <BooksList books={pageBooks} loading={loading} error={error} />
        )}

        {loading !== "pending" && !error && totalItems > 0 && (
          <BooksPartNav
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default BooksR;
