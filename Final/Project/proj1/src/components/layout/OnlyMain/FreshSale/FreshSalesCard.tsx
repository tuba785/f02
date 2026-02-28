import { Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { Book } from "../../../../types/book";
import { colors } from "../../../../styles/colors";

interface FreshSalesCardProps {
  book: Book;
}

const FreshSalesCard = ({ book }: FreshSalesCardProps) => {
  const formatPrice = (value: number) => value.toFixed(2);
  const coverUrl = `${book.cover}/250/350`;

  return (
    <Link
      to={`/books/${book.id}`}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <VStack align="center" gap={3} w="full" cursor="pointer">
        <Box
          w="250px"
          h="350px"
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
        </Box>

        <Text
          fontSize="lg"
          fontWeight="bold"
          color="gray.800"
          textAlign="center"
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
          fontSize="md"
          color={colors.primary.purple}
          textAlign="center"
          css={{
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.genre}, {book.language}, {book.format}
        </Text>

        <HStack gap={2}>
          <Text fontSize="xl" fontWeight="bold" color={colors.primary.purple}>
            $ {formatPrice(book.discounted_price)}
          </Text>
          <Text fontSize="md" color="gray.400" textDecoration="line-through">
            $ {formatPrice(book.price)}
          </Text>
        </HStack>
      </VStack>
    </Link>
  );
};

export default FreshSalesCard;
