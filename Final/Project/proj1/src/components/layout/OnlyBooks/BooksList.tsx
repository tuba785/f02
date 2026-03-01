import { Flex, Text, Spinner } from "@chakra-ui/react";
import BooksListItem from "./BooksListItem";
import type { Book } from "../../../types/book";

interface BooksListProps {
  books: Book[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const BooksList = ({ books, loading, error }: BooksListProps) => {
  if (loading === "pending") {
    return (
      <Flex justify="center" align="center" py={20}>
        <Spinner size="lg" color="brand.purple" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" py={10}>
        <Text color="red.500" fontSize="14px">
          {error}
        </Text>
      </Flex>
    );
  }

  if (books.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" py={16} gap={2}>
        <Text fontSize="40px">📚</Text>
        <Text fontSize="18px" fontWeight="700" color="text.heading">
          No books found
        </Text>
        <Text fontSize="14px" color="text.muted">
          Try adjusting your filters or search criteria
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={4} w="full" maxW="1200px" mx="auto">
      {books.map((book) => (
        <BooksListItem key={book.id} book={book} />
      ))}
    </Flex>
  );
};

export default BooksList;
