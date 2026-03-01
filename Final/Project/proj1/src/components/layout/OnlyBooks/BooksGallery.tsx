import { Flex, Text, Spinner, Grid } from "@chakra-ui/react";
import BooksGalleryItem from "./BooksGalleryItem";
import type { Book } from "../../../types/book";

interface BooksGalleryProps {
  books: Book[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const BooksGallery = ({ books, loading, error }: BooksGalleryProps) => {
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
    <Grid
      templateColumns="repeat(4, 275px)"
      gap={4}
      w="full"
      justifyContent="start"
    >
      {books.map((book) => (
        <BooksGalleryItem key={book.id} book={book} />
      ))}
    </Grid>
  );
};

export default BooksGallery;
