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
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";

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
    <Box w="100%" py={16} px={8} bg="white">
      <Heading as="h2" fontSize="32px" mb={2} color="#1f2937">
        📚 Our Books Collection
      </Heading>
      <Text fontSize="16px" color="gray.600" mb={12}>
        {books.length} books available
      </Text>

      {books.length === 0 ? (
        <Text fontSize="16px" color="gray.600">
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
              bg="white"
              w="275px"
              h="495px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="12px"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-4px)",
              }}
            >
              {/* Обложка книги */}
              <Box position="relative" w="100%" h="220px" bg="gray.100">
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
                    bg={PRIMARY_ORANGE}
                    color="white"
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
                    bg={PRIMARY_PURPLE}
                    color="white"
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
                    color="#1f2937"
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
                  <Text fontSize="13px" color="gray.600">
                    {book.author}
                  </Text>
                </VStack>

                {/* Жанр и язык */}
                <HStack gap={2} flexWrap="wrap">
                  <Badge bg="gray.100" color="gray.700" fontSize="11px">
                    {book.genre}
                  </Badge>
                  <Badge bg="gray.100" color="gray.700" fontSize="11px">
                    {book.language}
                  </Badge>
                </HStack>

                {/* Формат и страницы */}
                <HStack gap={4} fontSize="12px" color="gray.600">
                  <Text>{book.format}</Text>
                  <Text>📖 {book.page_count} pages</Text>
                </HStack>

                {/* Рейтинг и отзывы */}
                <HStack gap={4} fontSize="13px">
                  <HStack gap={1}>
                    <Text color={PRIMARY_ORANGE} fontWeight="bold">
                      ★ {book.rating.toFixed(1)}
                    </Text>
                    <Text color="gray.600">({book.comments_count})</Text>
                  </HStack>
                  <HStack gap={1} color="gray.600">
                    <Text>❤️ {book.likes_count.toLocaleString()}</Text>
                  </HStack>
                </HStack>

                {/* Цены */}
                <HStack
                  gap={2}
                  pt={2}
                  borderTop="1px solid"
                  borderColor="gray.200"
                >
                  {book.discount && book.discount > 0 ? (
                    <>
                      <Text
                        fontSize="18px"
                        fontWeight="bold"
                        color={PRIMARY_PURPLE}
                      >
                        ${book.discounted_price.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="14px"
                        color="gray.400"
                        textDecoration="line-through"
                      >
                        ${book.price.toFixed(2)}
                      </Text>
                    </>
                  ) : (
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      color={PRIMARY_PURPLE}
                    >
                      ${book.price.toFixed(2)}
                    </Text>
                  )}
                </HStack>

                {/* ISBN и издатель */}
                <Text
                  fontSize="11px"
                  color="gray.500"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  ISBN: {book.isbn}
                </Text>
                <Text
                  fontSize="11px"
                  color="gray.500"
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
