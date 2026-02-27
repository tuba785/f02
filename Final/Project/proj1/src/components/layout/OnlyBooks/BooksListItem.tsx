import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";
import { AddToCartBtn, HeartBtn } from "./BooksBtnCom";
import type { Book } from "../../../types/book";

interface BooksListItemProps {
  book: Book;
}

const BOOK_WIDTH = 229;
const BOOK_HEIGHT = 320;

const BooksListItem = ({ book }: BooksListItemProps) => {
  const hasDiscount = book.discount !== null && book.discount > 0;

  const filledStars = Math.round(book.rating);

  const subtitle = [book.genre, book.language, book.format]
    .filter(Boolean)
    .join(", ");

  return (
    <Flex
      bg="white"
      border="1px solid #e8e8e8"
      borderRadius="16px"
      p={6}
      gap={6}
      align="stretch"
      w="full"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      <Box
        minW="160px"
        maxW="160px"
        h="220px"
        bg="#e0e0e0"
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
            <Text fontSize="20px" fontWeight="700" color="#11142d">
              {book.title}
            </Text>
            {subtitle && (
              <Text
                fontSize="12px"
                fontWeight="500"
                color={PRIMARY_PURPLE}
                textTransform="uppercase"
              >
                {subtitle}
              </Text>
            )}
            <Text
              fontSize="13px"
              fontWeight="400"
              color="#808191"
              mt={2}
              lineClamp={3}
            >
              &quot;{book.description}&quot;
            </Text>
          </Flex>

          <Flex direction="column" align="flex-end" gap={0} flexShrink={0}>
            <Flex gap="2px">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar
                  key={s}
                  size={16}
                  color={s <= filledStars ? PRIMARY_ORANGE : "#e0e0e0"}
                />
              ))}
            </Flex>
            <Flex align="center" gap={1} mt={1}>
              <Text fontSize="14px" fontWeight="700" color="#11142d">
                {book.rating}
              </Text>
              <Text fontSize="12px" fontWeight="400" color="#b0b7c3">
                {book.comments_count} Reviews
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="center" gap={3} flexWrap="wrap">
          <Flex align="baseline" gap={2}>
            <Text fontSize="22px" fontWeight="700" color="#11142d">
              $ {book.discounted_price.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text
                fontSize="14px"
                fontWeight="400"
                color="#b0b7c3"
                textDecoration="line-through"
              >
                ${book.price.toFixed(2)}
              </Text>
            )}
          </Flex>

          {hasDiscount && (
            <>
              <Flex
                align="center"
                px={3}
                h="30px"
                borderRadius="20px"
                border={`1px solid ${PRIMARY_ORANGE}`}
                cursor="pointer"
                transition="all 0.15s"
                _hover={{ bg: "#fff5f2" }}
              >
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={PRIMARY_ORANGE}
                  whiteSpace="nowrap"
                >
                  Get {book.discount}% Discount for today
                </Text>
              </Flex>
              <Flex
                align="center"
                px={3}
                h="30px"
                borderRadius="20px"
                border={`1px solid ${PRIMARY_ORANGE}`}
                cursor="pointer"
                transition="all 0.15s"
                _hover={{ bg: "#fff5f2" }}
              >
                <Text
                  fontSize="11px"
                  fontWeight="600"
                  color={PRIMARY_ORANGE}
                  whiteSpace="nowrap"
                >
                  {book.discount}% OFF Discount
                </Text>
              </Flex>
            </>
          )}
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          borderTop="1px solid #f0f0f0"
          pt={3}
          mt={1}
        >
          <Flex gap={8}>
            <Flex direction="column" gap={0}>
              <Text fontSize="11px" fontWeight="400" color="#b0b7c3">
                Written by
              </Text>
              <Text fontSize="13px" fontWeight="600" color="#11142d">
                {book.author}
              </Text>
            </Flex>
            <Flex direction="column" gap={0}>
              <Text fontSize="11px" fontWeight="400" color="#b0b7c3">
                Publisher
              </Text>
              <Text fontSize="13px" fontWeight="600" color="#11142d">
                {book.publisher}
              </Text>
            </Flex>
            <Flex direction="column" gap={0}>
              <Text fontSize="11px" fontWeight="400" color="#b0b7c3">
                Year
              </Text>
              <Text fontSize="13px" fontWeight="600" color="#11142d">
                {book.release_date?.split("/")[2]}
              </Text>
            </Flex>
          </Flex>

          {/* Buttons */}
          <Flex align="center" gap={2}>
            <AddToCartBtn />
            <HeartBtn />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BooksListItem;
