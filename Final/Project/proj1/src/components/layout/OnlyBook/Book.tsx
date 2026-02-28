import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { PRIMARY_PURPLE } from "../../../styles/colors";
import BookMainInfo from "./BookMainInfo";
import BookDetails from "./BookDetails";
import BookReviews from "./BookReviews";
import RelatedBooks from "./RelatedBooks";

type Tab = "details" | "reviews";

interface BookProps {
  bookId?: string;
}

const Book = ({ bookId = "15" }: BookProps) => {
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
              color={tab === "details" ? "#11142d" : "#b0b7c3"}
              cursor="pointer"
              borderBottom={
                tab === "details"
                  ? `3px solid ${PRIMARY_PURPLE}`
                  : "3px solid transparent"
              }
              pb={2}
              transition="all 0.15s"
              onClick={() => setTab("details")}
              _hover={{ color: "#11142d" }}
            >
              Details Product
            </Text>
            <Text
              fontSize="20px"
              fontWeight="700"
              color={tab === "reviews" ? "#11142d" : "#b0b7c3"}
              cursor="pointer"
              borderBottom={
                tab === "reviews"
                  ? `3px solid ${PRIMARY_PURPLE}`
                  : "3px solid transparent"
              }
              pb={2}
              transition="all 0.15s"
              onClick={() => setTab("reviews")}
              _hover={{ color: "#11142d" }}
            >
              Customer Reviews
            </Text>
          </Flex>

          {tab === "details" ? (
            <BookDetails bookId={bookId} />
          ) : (
            <BookReviews />
          )}
        </Flex>

        <Flex direction="column" gap={6} w="320px" minW="320px" flexShrink={0}>
          <Text fontSize="20px" fontWeight="700" color="#11142d">
            Related Books
          </Text>
          <RelatedBooks />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Book;
