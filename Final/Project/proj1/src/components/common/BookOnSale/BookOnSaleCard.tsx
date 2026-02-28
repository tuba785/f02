import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Book } from "../../../types/book";
import { colors } from "../../../styles/colors";

interface BookOnSaleCardProps {
  book: Book;
}

const BookOnSaleCard = ({ book }: BookOnSaleCardProps) => {
  const formatPrice = (value: number) => value.toFixed(2);
  const coverUrl = `${book.cover}/200/260`;

  return (
    <Link
      to={`/books/${book.id}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Box
        w="full"
        transition="all 0.2s ease"
        _hover={{ transform: "translateY(-4px)" }}
        cursor="pointer"
      >
        <VStack align="start" gap={2} w="full">
          <Box
            position="relative"
            w="full"
            h="260px"
            bg="gray.300"
            borderRadius="xl"
            overflow="hidden"
          >
            {book.cover && (
              <Image
                src={coverUrl}
                alt={book.title}
                w="full"
                h="full"
                objectFit="cover"
              />
            )}

            {book.discount !== null && book.discount > 0 && (
              <Box
                position="absolute"
                top={3}
                left={3}
                bg={colors.primary.orange}
                color="white"
                px={3}
                py={1}
                borderRadius="md"
                fontSize="sm"
                fontWeight="bold"
              >
                {book.discount}%
              </Box>
            )}
          </Box>

          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.800"
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.title}
          </Text>

          <Text
            fontSize="xs"
            color={colors.primary.purple}
            css={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.genre}, {book.language}, {book.format}
          </Text>

          <HStack w="full" justify="space-between" pt={1}>
            <HStack gap={2} color={colors.primary.orange}>
              <FaStar size={14} />
              <Text fontSize="sm" fontWeight="bold">
                {book.rating.toFixed(1)}
              </Text>
            </HStack>

            <HStack gap={2}>
              <Text fontSize="sm" fontWeight="bold" color="gray.800">
                $ {formatPrice(book.discounted_price)}
              </Text>
              <Text
                fontSize="xs"
                color="gray.400"
                textDecoration="line-through"
              >
                $ {formatPrice(book.price)}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default BookOnSaleCard;
