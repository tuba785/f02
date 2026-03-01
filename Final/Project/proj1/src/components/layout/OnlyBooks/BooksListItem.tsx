import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddToCartBtn, HeartBtn, StarRating } from "./BooksBtnCom";
import type { Book } from "../../../types/book";
import { useTranslation } from "react-i18next";

interface BooksListItemProps {
  book: Book;
}

const BOOK_WIDTH = 229;
const BOOK_HEIGHT = 320;

const BooksListItem = ({ book }: BooksListItemProps) => {
  const { t } = useTranslation();
  const hasDiscount = book.discount !== null && book.discount > 0;

  const subtitle = [book.genre, book.language, book.format]
    .filter(Boolean)
    .join(", ");

  return (
    <Link
      to={`/books/${book.id}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Flex
        bg="bg.surface"
        border="1px solid"
        borderColor="border.default"
        borderRadius="16px"
        p={6}
        gap={6}
        align="stretch"
        w="full"
        transition="box-shadow 0.2s"
        _hover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
        cursor="pointer"
      >
        <Box
          minW="160px"
          maxW="160px"
          h="220px"
          bg="bg.skeleton"
          borderRadius="12px"
          overflow="hidden"
          flexShrink={0}
        >
          {book.cover && (
            <Image
              src={`${book.cover}/${BOOK_WIDTH}/${BOOK_HEIGHT}`}
              alt={book.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          )}
        </Box>

        <Flex flex="1" direction="column" justify="space-between" gap={2}>
          <Flex justify="space-between" align="flex-start">
            <Flex direction="column" gap={1} flex="1" mr={4}>
              <Text fontSize="20px" fontWeight="700" color="text.strong">
                {book.title}
              </Text>
              {subtitle && (
                <Text
                  fontSize="12px"
                  fontWeight="500"
                  color="brand.purple"
                  textTransform="uppercase"
                >
                  {subtitle}
                </Text>
              )}
              <Text
                fontSize="13px"
                fontWeight="400"
                color="text.muted"
                mt={2}
                lineClamp={3}
              >
                &quot;{book.description}&quot;
              </Text>
            </Flex>

            <Flex direction="column" align="flex-end" gap={0} flexShrink={0}>
              <StarRating rating={book.rating} />
              <Flex align="center" gap={1} mt={1}>
                <Text fontSize="14px" fontWeight="700" color="text.strong">
                  {book.rating}
                </Text>
                <Text fontSize="12px" fontWeight="400" color="text.muted">
                  {book.comments_count} {t("book_list.reviews")}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex align="center" gap={3} flexWrap="wrap">
            <Flex align="baseline" gap={2}>
              <Text fontSize="22px" fontWeight="700" color="text.strong">
                $ {book.discounted_price.toFixed(2)}
              </Text>
              {hasDiscount && (
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color="text.muted"
                  textDecoration="line-through"
                >
                  ${book.price.toFixed(2)}
                </Text>
              )}
            </Flex>

            {hasDiscount && (
              <Flex
                align="center"
                px={3}
                h="30px"
                borderRadius="20px"
                border="1px solid"
                borderColor="brand.purple"
                cursor="pointer"
                transition="all 0.15s"
                _hover={{ bg: "brand.lightPurple" }}
              >
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color="brand.purple"
                  whiteSpace="nowrap"
                >
                  {book.discount}% {t("book_list.off_discount")}
                </Text>
              </Flex>
            )}
            {book.is_bestseller && (
              <Flex
                align="center"
                px={3}
                h="30px"
                borderRadius="20px"
                border="1px solid"
                borderColor="brand.orange"
                cursor="pointer"
                transition="all 0.15s"
                _hover={{ bg: "#fff5f2" }}
              >
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color="brand.orange"
                  whiteSpace="nowrap"
                >
                  {t("book_list.bestseller")}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            borderTop="1px solid"
            borderTopColor="border.default"
            pt={3}
            mt={1}
          >
            <Flex gap={8}>
              <Flex direction="column" gap={0}>
                <Text fontSize="11px" fontWeight="400" color="text.muted">
                  {t("book_list.written_by")}
                </Text>
                <Text fontSize="13px" fontWeight="600" color="text.strong">
                  {book.author}
                </Text>
              </Flex>
              <Flex direction="column" gap={0}>
                <Text fontSize="11px" fontWeight="400" color="text.muted">
                  {t("book_list.publisher")}
                </Text>
                <Text fontSize="13px" fontWeight="600" color="text.strong">
                  {book.publisher}
                </Text>
              </Flex>
              <Flex direction="column" gap={0}>
                <Text fontSize="11px" fontWeight="400" color="text.muted">
                  {t("book_list.year")}
                </Text>
                <Text fontSize="13px" fontWeight="600" color="text.strong">
                  {book.release_date?.split("/")[2]}
                </Text>
              </Flex>
            </Flex>

            <Flex align="center" gap={2}>
              <AddToCartBtn bookId={book.id} />
              <HeartBtn bookId={book.id} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default BooksListItem;
