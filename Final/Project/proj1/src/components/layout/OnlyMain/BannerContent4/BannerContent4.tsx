import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { useColorMode } from "../../../ui/color-mode";
import { HiShoppingCart } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const MAIN_BOOK_WIDTH = 292;
const MAIN_BOOK_HEIGHT = 410;
const SMALL_BOOK_WIDTH = 240;
const SMALL_BOOK_HEIGHT = 335;

export const BannerContent4 = () => {
  const { t } = useTranslation();
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

  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      height="850px"
      position="relative"
      backgroundImage={
        colorMode === "dark"
          ? "none"
          : `url('src/assets/banners/home-banner4.png')`
      }
      backgroundColor={colorMode === "dark" ? "bg.surface" : undefined}
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
              color="brand.purple"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              {t("banner4.featured_books")}
            </Text>
            <Heading
              as="h2"
              fontSize="42px"
              fontWeight="700"
              color="text.heading"
              lineHeight="1.2"
            >
              {t("banner4.featured_books")}
            </Heading>
            <Text
              fontSize="15px"
              color="text.secondary"
              lineHeight="1.6"
              maxW="420px"
            >
              {t("banner4.description")}
            </Text>
          </VStack>

          {mainBook && (
            <Link
              to={`/books/${mainBook.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                bg="bg.surface"
                borderRadius="16px"
                padding="24px"
                boxShadow="0 10px 40px rgba(0, 0, 0, 0.12)"
                width="100%"
                w="650px"
                cursor="pointer"
              >
                <Flex gap="20px">
                  <Box
                    width={`${MAIN_BOOK_WIDTH}px`}
                    height={`${MAIN_BOOK_HEIGHT}px`}
                    borderRadius="12px"
                    overflow="hidden"
                    backgroundColor="status.inactive"
                    flexShrink={0}
                    position="relative"
                  >
                    {mainBook.is_bestseller && (
                      <Badge
                        position="absolute"
                        top="12px"
                        right="12px"
                        bg="brand.orange"
                        color="text.onBrand"
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
                        bg="brand.purple"
                        color="text.onBrand"
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
                        color="text.heading"
                        lineHeight="1.3"
                        mb="6px"
                      >
                        {mainBook.title}
                      </Heading>
                      <Text
                        fontSize="12px"
                        color="brand.purple"
                        fontWeight="600"
                        mb="12px"
                      >
                        {mainBook.genre} • {mainBook.language} •{" "}
                        {mainBook.format}
                      </Text>

                      <Text
                        fontSize="13px"
                        color="text.secondary"
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
                        color="text.secondary"
                      >
                        <VStack align="flex-start" gap="2px">
                          <Text
                            fontWeight="500"
                            fontSize="11px"
                            color="text.placeholder"
                            textTransform="uppercase"
                          >
                            {t("banner4.written_by")}
                          </Text>
                          <Text fontWeight="600" color="text.heading">
                            {mainBook.author}
                          </Text>
                        </VStack>
                        <VStack align="flex-start" gap="2px">
                          <Text
                            fontWeight="500"
                            fontSize="11px"
                            color="text.placeholder"
                            textTransform="uppercase"
                          >
                            {t("banner4.year")}
                          </Text>
                          <Text fontWeight="600" color="text.heading">
                            {mainBook.release_date.split("/")[2]}
                          </Text>
                        </VStack>
                      </Flex>

                      <Flex gap="12px" align="center" width="100%" mt="10px">
                        <Heading
                          as="h4"
                          fontSize="22px"
                          fontWeight="700"
                          color="text.heading"
                        >
                          ${mainBook.discounted_price.toFixed(2)}
                        </Heading>
                        {mainBook.discount && mainBook.discount > 0 && (
                          <Text
                            fontSize="14px"
                            color="text.placeholder"
                            textDecoration="line-through"
                          >
                            ${mainBook.price.toFixed(2)}
                          </Text>
                        )}
                        <Button
                          ml="auto"
                          bg="brand.purple"
                          color="text.onBrand"
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
                          {t("banner4.add")}
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Link>
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
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  width={`${SMALL_BOOK_WIDTH}px`}
                  height={`${SMALL_BOOK_HEIGHT}px`}
                  borderRadius="12px"
                  overflow="hidden"
                  backgroundColor="status.inactive"
                  boxShadow="0 8px 20px rgba(0, 0, 0, 0.1)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",
                  }}
                  position="relative"
                  cursor="pointer"
                >
                  {book.is_bestseller && (
                    <Badge
                      position="absolute"
                      top="8px"
                      right="8px"
                      bg="brand.orange"
                      color="text.onBrand"
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
                      bg="brand.purple"
                      color="text.onBrand"
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
              </Link>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};
