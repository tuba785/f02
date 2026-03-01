import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { Book } from "../../../types/book";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  query: string;
}

const Search = ({ isOpen, onClose, books, query }: SearchProps) => {
  if (!isOpen || !query.trim()) return null;

  return (
    <Box
      position="absolute"
      top="100%"
      left={0}
      right={0}
      mt={2}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="16px"
      boxShadow="0 8px 32px rgba(0,0,0,0.12)"
      p={4}
      zIndex={20}
      maxH="420px"
      overflowY="auto"
    >
      <Text fontSize="13px" fontWeight="600" color="text.secondary" mb={2}>
        Search results
      </Text>

      {books.length === 0 ? (
        <Flex align="center" justify="center" py={6}>
          <Text fontSize="14px" color="text.secondary">
            No books found for &quot;{query}&quot;
          </Text>
        </Flex>
      ) : (
        <Flex direction="column" gap={1}>
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} onClick={onClose}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="12px"
                cursor="pointer"
                transition="background 0.15s"
                _hover={{ bg: "bg.subtler" }}
              >
                <Box
                  w="48px"
                  h="64px"
                  borderRadius="8px"
                  overflow="hidden"
                  bg="bg.placeholder"
                  flexShrink={0}
                >
                  {book.cover && (
                    <Image
                      src={`${book.cover}/48/64`}
                      alt={book.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  )}
                </Box>

                <Flex direction="column" gap={0} flex={1} minW={0}>
                  <Text
                    fontSize="14px"
                    fontWeight="700"
                    color="text.primary"
                    lineClamp={1}
                  >
                    {book.title}
                  </Text>
                  <Text fontSize="12px" color="text.secondary" lineClamp={1}>
                    {book.author}
                  </Text>
                </Flex>

                <Text
                  fontSize="14px"
                  fontWeight="700"
                  color="brand.purple"
                  flexShrink={0}
                >
                  ${book.discounted_price.toFixed(2)}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
