import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import BookMainInfo from "./BookMainInfo";
import BookDetails from "./BookDetails";
import BookReviews from "./BookReviews";
import RelatedBooks from "./RelatedBooks";

type Tab = "details" | "reviews";

interface BookProps {
  bookId?: string;
}

const Book = ({ bookId = "15" }: BookProps) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("details");

  return (
    <Flex direction="column" w="full" maxW="1440px" mx="auto" gap={8}>
      <BookMainInfo bookId={bookId} />

      <Flex gap={10} align="flex-start">
        <Flex direction="column" flex={1} gap={6} minW={0}>
          <Flex gap={8}>
            <Text
              fontSize="20px"
              fontWeight="700"
              color={tab === "details" ? "text.heading" : "text.muted"}
              cursor="pointer"
              borderBottom="3px solid"
              borderBottomColor={
                tab === "details" ? "brand.purple" : "transparent"
              }
              pb={2}
              transition="all 0.15s"
              onClick={() => setTab("details")}
              _hover={{ color: "text.heading" }}
            >
              {t("book_detail.details_product")}
            </Text>
            <Text
              fontSize="20px"
              fontWeight="700"
              color={tab === "reviews" ? "text.heading" : "text.muted"}
              cursor="pointer"
              borderBottom="3px solid"
              borderBottomColor={
                tab === "reviews" ? "brand.purple" : "transparent"
              }
              pb={2}
              transition="all 0.15s"
              onClick={() => setTab("reviews")}
              _hover={{ color: "text.heading" }}
            >
              {t("book_detail.customer_reviews")}
            </Text>
          </Flex>

          {tab === "details" ? (
            <BookDetails bookId={bookId} />
          ) : (
            <BookReviews />
          )}
        </Flex>

        <Flex direction="column" gap={6} w="320px" minW="320px" flexShrink={0}>
          <Text fontSize="20px" fontWeight="700" color="text.heading">
            {t("book_detail.related_books")}
          </Text>
          <RelatedBooks />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Book;
