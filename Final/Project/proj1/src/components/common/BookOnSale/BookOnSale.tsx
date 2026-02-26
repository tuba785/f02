import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBooks } from "../../../hooks/useBooks";
import type { Book } from "../../../types/book";
import BookOnSaleCard from "./BookOnSaleCard";

const BookOnSale = () => {
  const { books: allBooks, getBooks } = useBooks();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (allBooks && allBooks.length > 0) {
      const discounted = allBooks.filter(
        (book) => book.discount !== null && book.discount > 0,
      );
      const topDiscounted = [...discounted]
        .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
        .slice(0, 6);
      setBooks(topDiscounted);
    }
  }, [allBooks]);

  return (
    <Box py={12} px={4} bg="white">
      <VStack gap={6} maxW="1400px" mx="auto" align="start">
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.800"
        >
          Books on Sale
        </Heading>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={{ base: 6, md: 8 }}
          w="full"
        >
          {books.map((book) => (
            <BookOnSaleCard key={book.id} book={book} />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default BookOnSale;
