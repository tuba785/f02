import { useEffect, useState } from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    bookService
      .fetchBookById(bookId)
      .then((b) => setBook(b))
      .catch(() => setError(t("book_detail.failed_to_load")))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Spinner size="lg" color="brand.purple" />
      </Flex>
    );
  }

  if (error || !book) {
    return (
      <Flex justify="center" py={10}>
        <Text color="red.500" fontSize="16px" fontWeight="600">
          {error ?? t("book_detail.book_not_found")}
        </Text>
      </Flex>
    );
  }

  const hasDiscount = book.discount !== null && book.discount > 0;

  const tags: { label: string; color: string; bg: string; border: string }[] = [
    {
      label: book.genre,
      color: "brand.purple",
      bg: "brand.lightPurple",
      border: "brand.purple",
    },
    {
      label: getDecade(book.release_date),
      color: "brand.purple",
      bg: "brand.lightPurple",
      border: "brand.purple",
    },
  ];

  if (hasDiscount) {
    tags.push({
      label: `${book.discount}% OFF`,
      color: "brand.purple",
      bg: "brand.lightPurple",
      border: "brand.purple",
    });
  }

  if (book.is_bestseller) {
    tags.push({
      label: t("book_list.bestseller"),
      color: "brand.purple",
      bg: "brand.lightPurple",
      border: "brand.purple",
    });
  }

  const rows: { label: string; value: string }[] = [
    { label: t("book_detail.book_title"), value: book.title },
    { label: t("book_detail.author"), value: book.author },
    {
      label: t("book_detail.isbn"),
      value: `${book.isbn} (ISBN13: ${book.isbn})`,
    },
    { label: t("book_detail.edition_language"), value: book.language },
    {
      label: t("book_detail.book_format"),
      value: `${book.format}, ${book.page_count} ${t("book_detail.pages")}`,
    },
    {
      label: t("book_detail.date_published"),
      value: formatDate(book.release_date),
    },
    { label: t("book_detail.publisher"), value: book.publisher },
  ];

  return (
    <Flex direction="column" bg="bg.surface" borderRadius="20px" w="full">
      {rows.map((row, i) => (
        <Flex
          key={row.label}
          align="center"
          py={5}
          px={8}
          borderTop={i === 0 ? "none" : "1px solid"}
          borderTopColor="border.default"
        >
          <Text
            fontSize="15px"
            fontWeight="700"
            color="text.heading"
            w="280px"
            minW="280px"
            flexShrink={0}
          >
            {row.label}
          </Text>
          <Text fontSize="15px" color="text.muted" fontWeight="400">
            {row.value}
          </Text>
        </Flex>
      ))}

      <Flex
        align="flex-start"
        py={5}
        px={8}
        borderTop="1px solid"
        borderTopColor="border.default"
      >
        <Text
          fontSize="15px"
          fontWeight="700"
          color="text.heading"
          w="280px"
          minW="280px"
          flexShrink={0}
          pt={1}
        >
          {t("book_detail.tags")}
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
              border="1px solid"
              borderColor={tag.border}
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
