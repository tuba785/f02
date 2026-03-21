import { Box, VStack, Text, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import FreshSalesCard from "./FreshSalesCard";
import { useTranslation } from "react-i18next";
import TimeForSale from "./TimeForSale";

const FreshSale = () => {
  const { t } = useTranslation();
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
      const shuffled = [...discounted].sort(() => 0.5 - Math.random());
      setBooks(shuffled.slice(0, 5));
    }
  }, [allBooks]);

  return (
    <Box py={16} px={4} bg="bg.page">
      <VStack gap={8} maxW="1400px" mx="auto">
        <VStack gap={3} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="text.heading"
          >
            {t("fresh_sale.title")}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="text.muted">
            {t("fresh_sale.description")}
          </Text>
        </VStack>

        <TimeForSale />

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={{ base: 6, md: 8 }}
          w="full"
        >
          {books.map((book) => (
            <FreshSalesCard key={book.id} book={book} />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default FreshSale;
