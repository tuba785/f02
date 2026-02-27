import { Box, Flex, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

interface BooksPartNavProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Build the page buttons array:
 *  ≤3 pages  → [1] [2] [3]
 *  4+ pages  → always show first, last, current, current-1
 *             with "..." where gaps exist
 */
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
      {/* Left: info text */}
      <Text fontSize="14px" fontWeight="400" color="#b0b7c3">
        Showing {showingStart}-{showingEnd} from {totalItems} data
      </Text>

      {/* Right: pagination */}
      <Flex align="center" gap={2}>
        {/* Previous */}
        <Flex
          align="center"
          gap={1}
          px={4}
          h="40px"
          borderRadius="10px"
          border="1px solid #e8e8e8"
          cursor={currentPage === 1 ? "default" : "pointer"}
          bg="white"
          opacity={currentPage === 1 ? 0.45 : 1}
          transition="all 0.15s"
          _hover={currentPage === 1 ? {} : { borderColor: "#ccc" }}
          onClick={() => {
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
        >
          <FiChevronLeft size={16} color={PRIMARY_PURPLE} />
          <Text fontSize="14px" fontWeight="500" color="#11142d">
            Previous
          </Text>
        </Flex>

        {/* Page numbers */}
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
              bg={currentPage === page ? PRIMARY_PURPLE : "transparent"}
              color={
                currentPage === page
                  ? "white"
                  : page === "..."
                    ? "#b0b7c3"
                    : "#11142d"
              }
              fontSize="14px"
              fontWeight={currentPage === page ? "700" : "500"}
              transition="all 0.15s"
              _hover={
                page !== "..."
                  ? {
                      bg: currentPage === page ? PRIMARY_PURPLE : "#f5f5f5",
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

        {/* Next */}
        <Flex
          align="center"
          gap={1}
          px={4}
          h="40px"
          borderRadius="10px"
          border="1px solid #e8e8e8"
          cursor={currentPage === totalPages ? "default" : "pointer"}
          bg="white"
          opacity={currentPage === totalPages ? 0.45 : 1}
          transition="all 0.15s"
          _hover={currentPage === totalPages ? {} : { borderColor: "#ccc" }}
          onClick={() => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
        >
          <Text fontSize="14px" fontWeight="500" color="#11142d">
            Next
          </Text>
          <FiChevronRight size={16} color={PRIMARY_PURPLE} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BooksPartNav;
