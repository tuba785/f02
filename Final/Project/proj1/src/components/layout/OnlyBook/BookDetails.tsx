import { useEffect, useState } from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import { PRIMARY_PURPLE, PRIMARY_LIGHT_PURPLE } from "../../../styles/colors";
import { bookService } from "../../../services/bookService";
import type { Book } from "../../../types/book";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ordinal = (d: number): string => {
  if (d > 3 && d < 21) return `${d}th`;
  const s = ["th", "st", "nd", "rd"];
  return `${d}${s[d % 10] ?? s[0]}`;
};

const formatDate = (raw: string): string => {
  const parts = raw.split("/");
  if (parts.length !== 3) return raw;
  const day = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const year = parts[2];
  return `${MONTHS[month]} ${ordinal(day)} ${year}`;
};

const getDecade = (raw: string): string => {
  const year = Number(raw.split("/")[2]);
  const decade = Math.floor(year / 10) * 10;
  return `Trending${decade}s`;
};

interface BookDetailsProps {
  bookId?: string;
}

const BookDetails = ({ bookId = "15" }: BookDetailsProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    bookService
      .fetchBookById(bookId)
      .then((b) => setBook(b))
      .catch(() => setError("Failed to load book details"))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Spinner size="lg" color={PRIMARY_PURPLE} />
      </Flex>
    );
  }

  if (error || !book) {
    return (
      <Flex justify="center" py={10}>
        <Text color="red.500" fontSize="16px" fontWeight="600">
          {error ?? "Book not found"}
        </Text>
      </Flex>
    );
  }

  const hasDiscount = book.discount !== null && book.discount > 0;

  const tags: { label: string; color: string; bg: string; border: string }[] = [
    {
      label: book.genre,
      color: PRIMARY_PURPLE,
      bg: PRIMARY_LIGHT_PURPLE,
      border: PRIMARY_PURPLE,
    },
    {
      label: getDecade(book.release_date),
      color: PRIMARY_PURPLE,
      bg: PRIMARY_LIGHT_PURPLE,
      border: PRIMARY_PURPLE,
    },
  ];

  if (hasDiscount) {
    tags.push({
      label: `${book.discount}% OFF`,
      color: PRIMARY_PURPLE,
      bg: PRIMARY_LIGHT_PURPLE,
      border: PRIMARY_PURPLE,
    });
  }

  if (book.is_bestseller) {
    tags.push({
      label: "Bestseller",
      color: PRIMARY_PURPLE,
      bg: PRIMARY_LIGHT_PURPLE,
      border: PRIMARY_PURPLE,
    });
  }

  const rows: { label: string; value: string }[] = [
    { label: "Book Title", value: book.title },
    { label: "Author", value: book.author },
    { label: "ISBN", value: `${book.isbn} (ISBN13: ${book.isbn})` },
    { label: "Edition Language", value: book.language },
    {
      label: "Book Format",
      value: `${book.format}, ${book.page_count} Pages`,
    },
    { label: "Date Published", value: formatDate(book.release_date) },
    { label: "Publisher", value: book.publisher },
  ];

  return (
    <Flex direction="column" bg="white" borderRadius="20px" w="full">
      {rows.map((row, i) => (
        <Flex
          key={row.label}
          align="center"
          py={5}
          px={8}
          borderTop={i === 0 ? "none" : "1px solid #ebebeb"}
        >
          <Text
            fontSize="15px"
            fontWeight="700"
            color="#11142d"
            w="280px"
            minW="280px"
            flexShrink={0}
          >
            {row.label}
          </Text>
          <Text fontSize="15px" color="#808191" fontWeight="400">
            {row.value}
          </Text>
        </Flex>
      ))}

      <Flex align="flex-start" py={5} px={8} borderTop="1px solid #ebebeb">
        <Text
          fontSize="15px"
          fontWeight="700"
          color="#11142d"
          w="280px"
          minW="280px"
          flexShrink={0}
          pt={1}
        >
          Tags
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {tags.map((tag) => (
            <Flex
              key={tag.label}
              align="center"
              justify="center"
              px={4}
              h="34px"
              borderRadius="8px"
              border={`1px solid ${tag.border}`}
              bg={tag.bg}
            >
              <Text fontSize="13px" fontWeight="700" color={tag.color}>
                {tag.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookDetails;
