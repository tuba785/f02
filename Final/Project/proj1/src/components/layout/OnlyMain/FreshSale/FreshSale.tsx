import { Box, VStack, HStack, Text, Heading, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { colors } from "../../../../styles/colors";
import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import FreshSalesCard from "./FreshSalesCard";

const FreshSale = () => {
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
            Flash Sale
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="text.muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </VStack>

        <Box
          border="1px solid"
          borderColor="border.default"
          borderRadius="lg"
          px={{ base: 6, md: 10 }}
          py={4}
        >
          <HStack gap={{ base: 4, md: 8 }}>
            <VStack gap={1} w="60px">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color={colors.primary.orange}
              >
                02
              </Text>
              <Text fontSize="xs" color="text.muted">
                Day
              </Text>
            </VStack>
            <VStack gap={1} w="60px">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color={colors.primary.orange}
              >
                05
              </Text>
              <Text fontSize="xs" color="text.muted">
                Hours
              </Text>
            </VStack>
            <VStack gap={1} w="60px">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color={colors.primary.orange}
              >
                42
              </Text>
              <Text fontSize="xs" color="text.muted">
                Minutes
              </Text>
            </VStack>
            <VStack gap={1} w="60px">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color={colors.primary.orange}
              >
                19
              </Text>
              <Text fontSize="xs" color="text.muted">
                Second
              </Text>
            </VStack>
          </HStack>
        </Box>

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
