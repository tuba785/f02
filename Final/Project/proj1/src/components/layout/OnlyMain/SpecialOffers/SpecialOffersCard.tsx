import { Box, VStack, HStack, Text, Image, Button } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import type { Book } from "../../../../types/book";
import { colors } from "../../../../styles/colors";

interface SpecialOffersCardProps {
  book: Book;
}

const SpecialOffersCard = ({ book }: SpecialOffersCardProps) => {
  const formatPrice = (value: number) => value.toFixed(2);
  const coverUrl = `${book.cover}/512/300`;

  return (
    <VStack
      align="stretch"
      gap={4}
      bg="white"
      borderRadius="lg"
      p={6}
      w="512px"
      h="690px"
      boxShadow="0 10px 20px -5px rgba(0, 0, 0, 0.1)"
    >
      <Box w="full" h="300px" bg="gray.300" borderRadius="lg" overflow="hidden">
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

      <Text fontSize="lg" fontWeight="bold" color="gray.800">
        {book.title}
      </Text>

      <HStack gap={2} flexWrap="wrap">
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color={colors.primary.purple}
          bg={colors.primary.lightPurple}
          px={3}
          py={1}
          borderRadius="md"
          textTransform="uppercase"
        >
          {book.genre}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color={colors.primary.purple}
          bg={colors.primary.lightPurple}
          px={3}
          py={1}
          borderRadius="md"
          textTransform="uppercase"
        >
          {book.language}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color={colors.primary.purple}
          bg={colors.primary.lightPurple}
          px={3}
          py={1}
          borderRadius="md"
          textTransform="uppercase"
        >
          {book.format}
        </Text>
      </HStack>

      <Text fontSize="sm" color="gray.500" lineHeight="tall" flex={1}>
        {book.description}
      </Text>

      <Text fontSize="sm" fontWeight="semibold" color="gray.800">
        {book.author}
      </Text>

      <HStack justify="space-between" align="center" w="full">
        <Button
          bg={colors.primary.purple}
          color="white"
          _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
          fontSize="sm"
          fontWeight="semibold"
        >
          <HStack gap={2}>
            <FaShoppingCart />
            <Text>Add to cart</Text>
          </HStack>
        </Button>

        <HStack gap={2}>
          <Text fontSize="md" fontWeight="bold" color={colors.primary.purple}>
            ${formatPrice(book.discounted_price)}
          </Text>
          <Text fontSize="sm" color="gray.400" textDecoration="line-through">
            ${formatPrice(book.price)}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default SpecialOffersCard;
