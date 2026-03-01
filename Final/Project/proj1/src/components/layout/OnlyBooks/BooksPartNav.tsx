import { Box, Flex, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface BooksPartNavProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const buildPages = (current: number, total: number): (number | "...")[] => {
  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  pages.add(current);
  if (current - 1 >= 1) pages.add(current - 1);
  if (current + 1 <= total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "...")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("...");
    }
    result.push(sorted[i]);
  }
  return result;
};

const BooksPartNav = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: BooksPartNavProps) => {
  if (totalPages <= 0) return null;

  const showingEnd = Math.min(currentPage * itemsPerPage, totalItems);
  const showingStart = (currentPage - 1) * itemsPerPage + 1;
  const pages = buildPages(currentPage, totalPages);

  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      maxW="1200px"
      mx="auto"
      py={4}
    >
      <Text fontSize="14px" fontWeight="400" color="text.muted">
        Showing {showingStart}-{showingEnd} from {totalItems} data
      </Text>

      <Flex align="center" gap={2}>
        <Flex
          align="center"
          gap={1}
          px={4}
          h="40px"
          borderRadius="10px"
          border="1px solid"
          borderColor="border.default"
          cursor={currentPage === 1 ? "default" : "pointer"}
          bg="bg.surface"
          opacity={currentPage === 1 ? 0.45 : 1}
          transition="all 0.15s"
          _hover={currentPage === 1 ? {} : { borderColor: "border.default" }}
          onClick={() => {
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
        >
          <FiChevronLeft size={16} color="var(--chakra-colors-brand-purple)" />
          <Text fontSize="14px" fontWeight="500" color="text.heading">
            Previous
          </Text>
        </Flex>

        <Flex align="center" gap={1}>
          {pages.map((page, i) => (
            <Box
              key={i}
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="10px"
              cursor={page === "..." ? "default" : "pointer"}
              bg={currentPage === page ? "brand.purple" : "transparent"}
              color={
                currentPage === page
                  ? "text.onBrand"
                  : page === "..."
                    ? "text.muted"
                    : "text.heading"
              }
              fontSize="14px"
              fontWeight={currentPage === page ? "700" : "500"}
              transition="all 0.15s"
              _hover={
                page !== "..."
                  ? {
                      bg:
                        currentPage === page ? "brand.purple" : "hover.surface",
                    }
                  : {}
              }
              onClick={() => {
                if (typeof page === "number") onPageChange(page);
              }}
            >
              {page}
            </Box>
          ))}
        </Flex>

        <Flex
          align="center"
          gap={1}
          px={4}
          h="40px"
          borderRadius="10px"
          border="1px solid"
          borderColor="border.default"
          cursor={currentPage === totalPages ? "default" : "pointer"}
          bg="bg.surface"
          opacity={currentPage === totalPages ? 0.45 : 1}
          transition="all 0.15s"
          _hover={
            currentPage === totalPages ? {} : { borderColor: "border.default" }
          }
          onClick={() => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
        >
          <Text fontSize="14px" fontWeight="500" color="text.heading">
            Next
          </Text>
          <FiChevronRight size={16} color="var(--chakra-colors-brand-purple)" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BooksPartNav;
