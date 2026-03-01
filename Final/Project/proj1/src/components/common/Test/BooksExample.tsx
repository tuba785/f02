import { useEffect } from "react";
import {
  Box,
  Grid,
  Text,
  Heading,
  HStack,
  VStack,
  Badge,
  Image,
} from "@chakra-ui/react";
import { useBooks } from "../../../hooks/useBooks";

// Image dimensions for book covers
const BOOK_COVER_WIDTH = 230;
const BOOK_COVER_HEIGHT = 320;

const BooksDisplay = () => {
  const { books, loading, error, getBooks } = useBooks();

  useEffect(() => {
    if (books.length === 0 && loading === "idle") {
      getBooks();
    }
  }, []);

  if (loading === "pending") {
    return (
      <Box w="100%" py={8} px={8}>
        <Box p={4} borderRadius="8px" mb={6}>
          <Text color="green.700" fontWeight="600" textAlign="center">
            Loading books...
          </Text>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" py={8} px={8}>
        <HStack p={4} borderRadius="8px" gap={4}>
          <Text color="red.700" fontWeight="600">
            Error loading books:
          </Text>
          <Text color="red.600">{error}</Text>
          <Text color="red.700" fontWeight="600">
            Please refresh the page or try again later.
          </Text>
        </HStack>
      </Box>
    );
  }

  return (
    <Box w="100%" py={16} px={8} bg="bg.surface">
      <Heading as="h2" fontSize="32px" mb={2} color="text.heading">
        📚 Our Books Collection
      </Heading>
      <Text fontSize="16px" color="text.muted" mb={12}>
        {books.length} books available
      </Text>

      {books.length === 0 ? (
        <Text fontSize="16px" color="text.muted">
          No books found
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={5}
        >
          {books.map((book) => (
            <Box
              key={book.id}
              bg="bg.surface"
              w="275px"
              h="495px"
              border="1px solid"
              borderColor="border.default"
              borderRadius="12px"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-4px)",
              }}
            >
              {/* Обложка книги */}
              <Box position="relative" w="100%" h="220px" bg="bg.subtle">
                <Image
                  src={`${book.cover}/${BOOK_COVER_WIDTH}/${BOOK_COVER_HEIGHT}`}
                  alt={book.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />

                {/* Badge для бестселлера */}
                {book.is_bestseller && (
                  <Badge
                    position="absolute"
                    top={2}
                    right={2}
                    bg="brand.orange"
                    color="text.onBrand"
                    borderRadius="6px"
                    px={2}
                    py={1}
                    fontSize="12px"
                    fontWeight="bold"
                  >
                    BESTSELLER
                  </Badge>
                )}

                {/* Badge для скидки */}
                {book.discount && book.discount > 0 && (
                  <Badge
                    position="absolute"
                    top={2}
                    left={2}
                    bg="brand.purple"
                    color="text.onBrand"
                    borderRadius="6px"
                    px={2}
                    py={1}
                    fontSize="12px"
                    fontWeight="bold"
                  >
                    -{book.discount}%
                  </Badge>
                )}
              </Box>

              {/* Информация о книге */}
              <VStack align="stretch" p={4} gap={3}>
                {/* Название и автор */}
                <VStack align="stretch" gap={1}>
                  <Heading
                    as="h3"
                    fontSize="15px"
                    color="text.heading"
                    lineHeight="1.3"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    style={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {book.title}
                  </Heading>
                  <Text fontSize="13px" color="text.muted">
                    {book.author}
                  </Text>
                </VStack>

                {/* Жанр и язык */}
                <HStack gap={2} flexWrap="wrap">
                  <Badge bg="bg.subtle" color="text.secondary" fontSize="11px">
                    {book.genre}
                  </Badge>
                  <Badge bg="bg.subtle" color="text.secondary" fontSize="11px">
                    {book.language}
                  </Badge>
                </HStack>

                {/* Формат и страницы */}
                <HStack gap={4} fontSize="12px" color="text.muted">
                  <Text>{book.format}</Text>
                  <Text>📖 {book.page_count} pages</Text>
                </HStack>

                {/* Рейтинг и отзывы */}
                <HStack gap={4} fontSize="13px">
                  <HStack gap={1}>
                    <Text color="brand.orange" fontWeight="bold">
                      ★ {book.rating.toFixed(1)}
                    </Text>
                    <Text color="text.muted">({book.comments_count})</Text>
                  </HStack>
                  <HStack gap={1} color="text.muted">
                    <Text>❤️ {book.likes_count.toLocaleString()}</Text>
                  </HStack>
                </HStack>

                {/* Цены */}
                <HStack
                  gap={2}
                  pt={2}
                  borderTop="1px solid"
                  borderColor="border.default"
                >
                  {book.discount && book.discount > 0 ? (
                    <>
                      <Text
                        fontSize="18px"
                        fontWeight="bold"
                        color="brand.purple"
                      >
                        ${book.discounted_price.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="14px"
                        color="text.placeholder"
                        textDecoration="line-through"
                      >
                        ${book.price.toFixed(2)}
                      </Text>
                    </>
                  ) : (
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      color="brand.purple"
                    >
                      ${book.price.toFixed(2)}
                    </Text>
                  )}
                </HStack>

                {/* ISBN и издатель */}
                <Text
                  fontSize="11px"
                  color="text.muted"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  ISBN: {book.isbn}
                </Text>
                <Text
                  fontSize="11px"
                  color="text.muted"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  Publisher: {book.publisher}
                </Text>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BooksDisplay;
