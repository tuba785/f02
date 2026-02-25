import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../../styles/colors";
import { HiShoppingCart } from "react-icons/hi";

const MAIN_BOOK_WIDTH = 292;
const MAIN_BOOK_HEIGHT = 410;
const SMALL_BOOK_WIDTH = 240;
const SMALL_BOOK_HEIGHT = 335;

export const BannerContent4 = () => {
  const { books, loading, getBooks } = useBooks();
  const [mainBook, setMainBook] = useState<Book | null>(null);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (books.length === 0 && loading === "idle") {
      getBooks();
    }
  }, [books.length, loading, getBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setMainBook(books.find((book) => book.id === "92") || books[0]);
      setFeaturedBooks(
        books.filter((book) =>
          ["2", "3", "4", "5", "6", "7"].includes(book.id),
        ),
      );
    }
  }, [books]);

  return (
    <Box
      width="100%"
      height="850px"
      position="relative"
      backgroundImage={`url('src/assets/banners/home-banner4.png')`}
      backgroundSize="cover"
      backgroundPosition="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(255, 255, 255, 0.03)"
        zIndex={0}
      />

      <Flex
        position="relative"
        zIndex={1}
        height="100%"
        gap="60px"
        paddingX="60px"
        paddingY="60px"
      >
        <VStack
          align="center"
          justifyContent="center"
          gap="24px"
          flex="1"
          maxW="900px"
        >
          <VStack align="flex-start" gap="12px">
            <Text
              fontSize="14px"
              fontWeight="600"
              color={PRIMARY_PURPLE}
              textTransform="uppercase"
              letterSpacing="1px"
            >
              Featured Books
            </Text>
            <Heading
              as="h2"
              fontSize="42px"
              fontWeight="700"
              color="#1a202c"
              lineHeight="1.2"
            >
              Featured Books
            </Heading>
            <Text fontSize="15px" color="#4a5568" lineHeight="1.6" maxW="420px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
            </Text>
          </VStack>

          {mainBook && (
            <Box
              bg="white"
              borderRadius="16px"
              padding="24px"
              boxShadow="0 10px 40px rgba(0, 0, 0, 0.12)"
              width="100%"
              w="650px"
            >
              <Flex gap="20px">
                <Box
                  width={`${MAIN_BOOK_WIDTH}px`}
                  height={`${MAIN_BOOK_HEIGHT}px`}
                  borderRadius="12px"
                  overflow="hidden"
                  backgroundColor="#cbd5e0"
                  flexShrink={0}
                  position="relative"
                >
                  {mainBook.is_bestseller && (
                    <Badge
                      position="absolute"
                      top="12px"
                      right="12px"
                      bg={PRIMARY_ORANGE}
                      color="white"
                      borderRadius="6px"
                      px="8px"
                      py="4px"
                      fontSize="11px"
                      fontWeight="bold"
                      zIndex={2}
                    >
                      BESTSELLER
                    </Badge>
                  )}
                  {mainBook.discount && mainBook.discount > 0 && (
                    <Badge
                      position="absolute"
                      top="12px"
                      left="12px"
                      bg={PRIMARY_PURPLE}
                      color="white"
                      borderRadius="6px"
                      px="8px"
                      py="4px"
                      fontSize="11px"
                      fontWeight="bold"
                      zIndex={2}
                    >
                      -{mainBook.discount}%
                    </Badge>
                  )}
                  <Image
                    src={`${mainBook.cover}/${MAIN_BOOK_WIDTH}/${MAIN_BOOK_HEIGHT}`}
                    alt={mainBook.title}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>

                <Flex
                  direction="column"
                  justify="space-between"
                  height={`${MAIN_BOOK_HEIGHT}px`}
                  flex="1"
                >
                  <Box>
                    <Heading
                      as="h3"
                      fontSize="18px"
                      fontWeight="700"
                      color="#1a202c"
                      lineHeight="1.3"
                      mb="6px"
                    >
                      {mainBook.title}
                    </Heading>
                    <Text
                      fontSize="12px"
                      color={PRIMARY_PURPLE}
                      fontWeight="600"
                      mb="12px"
                    >
                      {mainBook.genre} • {mainBook.language} • {mainBook.format}
                    </Text>

                    <Text
                      fontSize="13px"
                      color="#4a5568"
                      lineHeight="1.6"
                      display="-webkit-box"
                      overflow="hidden"
                      css={{
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {mainBook.description}
                    </Text>
                  </Box>

                  <Box>
                    <Flex
                      gap="24px"
                      width="100%"
                      fontSize="13px"
                      color="#4a5568"
                    >
                      <VStack align="flex-start" gap="2px">
                        <Text
                          fontWeight="500"
                          fontSize="11px"
                          color="#9ca3af"
                          textTransform="uppercase"
                        >
                          Written by
                        </Text>
                        <Text fontWeight="600" color="#1a202c">
                          {mainBook.author}
                        </Text>
                      </VStack>
                      <VStack align="flex-start" gap="2px">
                        <Text
                          fontWeight="500"
                          fontSize="11px"
                          color="#9ca3af"
                          textTransform="uppercase"
                        >
                          Year
                        </Text>
                        <Text fontWeight="600" color="#1a202c">
                          {mainBook.release_date.split("/")[2]}
                        </Text>
                      </VStack>
                    </Flex>

                    <Flex gap="12px" align="center" width="100%" mt="10px">
                      <Heading
                        as="h4"
                        fontSize="22px"
                        fontWeight="700"
                        color="#1a202c"
                      >
                        ${mainBook.discounted_price.toFixed(2)}
                      </Heading>
                      {mainBook.discount && mainBook.discount > 0 && (
                        <Text
                          fontSize="14px"
                          color="#9ca3af"
                          textDecoration="line-through"
                        >
                          ${mainBook.price.toFixed(2)}
                        </Text>
                      )}
                      <Button
                        ml="auto"
                        bg={PRIMARY_PURPLE}
                        color="white"
                        height="44px"
                        paddingX="20px"
                        borderRadius="8px"
                        fontSize="13px"
                        fontWeight="600"
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        _hover={{
                          opacity: 0.9,
                        }}
                        transition="all 0.3s ease"
                      >
                        <HiShoppingCart size={18} />
                        ADD
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          )}
        </VStack>

        <Flex flex="1" align="center" justify="center">
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap="16px"
            width="100%"
            maxW="780px"
            height="fit-content"
          >
            {featuredBooks.map((book) => (
              <Box
                key={book.id}
                width={`${SMALL_BOOK_WIDTH}px`}
                height={`${SMALL_BOOK_HEIGHT}px`}
                borderRadius="12px"
                overflow="hidden"
                backgroundColor="#cbd5e0"
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.1)"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",
                }}
                position="relative"
              >
                {book.is_bestseller && (
                  <Badge
                    position="absolute"
                    top="8px"
                    right="8px"
                    bg={PRIMARY_ORANGE}
                    color="white"
                    borderRadius="6px"
                    px="6px"
                    py="3px"
                    fontSize="10px"
                    fontWeight="bold"
                    zIndex={2}
                  >
                    BESTSELLER
                  </Badge>
                )}
                {book.discount && book.discount > 0 && (
                  <Badge
                    position="absolute"
                    top="8px"
                    left="8px"
                    bg={PRIMARY_PURPLE}
                    color="white"
                    borderRadius="6px"
                    px="6px"
                    py="3px"
                    fontSize="10px"
                    fontWeight="bold"
                    zIndex={2}
                  >
                    -{book.discount}%
                  </Badge>
                )}
                <Image
                  src={`${book.cover}/${SMALL_BOOK_WIDTH}/${SMALL_BOOK_HEIGHT}`}
                  alt={book.title}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};
