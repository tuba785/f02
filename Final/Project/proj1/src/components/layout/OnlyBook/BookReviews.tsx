import { Flex, Text, Image, Box } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { BsSortDown } from "react-icons/bs";
import { StarRating } from "../OnlyBooks/BooksBtnCom";
import { useTranslation } from "react-i18next";

const RATING_BARS: { stars: number; pct: number }[] = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 61 },
  { stars: 3, pct: 12 },
  { stars: 2, pct: 5 },
  { stars: 1, pct: 8 },
];

const REVIEWS = [
  {
    name: "David Here",
    date: "Jan 4th, 2020",
    avatar: "https://picsum.photos/seed/rev1/44/44",
    rating: 4.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
  },
  {
    name: "Melinda Lee",
    date: "Jan 4th, 2020",
    avatar: "https://picsum.photos/seed/rev2/44/44",
    rating: 3.5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
  },
  {
    name: "Johannah Jean",
    date: "Jan 4th, 2020",
    avatar: "https://picsum.photos/seed/rev3/44/44",
    rating: 4.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
  },
  {
    name: "Burhanudin Simatupang",
    date: "Jan 4th, 2020",
    avatar: "https://picsum.photos/seed/rev4/44/44",
    rating: 2.0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
  },
];

const BookReviews = () => {
  const { t } = useTranslation();
  return (
    <Flex
      direction="column"
      bg="bg.surface"
      borderRadius="20px"
      w="full"
      maxW="1200px"
    >
      <Flex px={8} pt={8} pb={6} gap={8} align="center">
        <Flex direction="column" gap={2} maxW="260px" flexShrink={0}>
          <Text fontSize="22px" fontWeight="800" color="text.heading">
            {t("book_reviews.rating_information")}
          </Text>
          <Text fontSize="13px" color="text.muted" lineHeight="1.6">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </Text>
        </Flex>

        <Flex direction="column" gap={1.5} flex={1}>
          {RATING_BARS.map((bar) => (
            <Flex key={bar.stars} align="center" gap={2}>
              <Flex align="center" gap={0.5} minW="30px">
                <FaStar size={10} color="var(--chakra-colors-brand-orange)" />
                <Text fontSize="13px" fontWeight="600" color="text.heading">
                  {bar.stars}
                </Text>
              </Flex>
              <Box
                flex={1}
                h="8px"
                bg="border.default"
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="full"
                  w={`${bar.pct}%`}
                  bg="brand.purple"
                  borderRadius="full"
                />
              </Box>
              <Text
                fontSize="13px"
                fontWeight="600"
                color="text.muted"
                minW="35px"
                textAlign="right"
              >
                {bar.pct}%
              </Text>
            </Flex>
          ))}
        </Flex>

        <Flex direction="column" align="center" gap={1} flexShrink={0}>
          <Flex align="baseline" gap={1.5}>
            <Text fontSize="40px" fontWeight="800" color="brand.purple">
              4.7
            </Text>
            <Text fontSize="14px" fontWeight="400" color="text.muted">
              {t("book_reviews.out_of_5")}
            </Text>
          </Flex>
          <StarRating rating={4.7} size={22} />
        </Flex>
      </Flex>

      <Box h="1px" bg="border.default" mx={8} />

      <Flex align="center" justify="space-between" px={8} py={4}>
        <Text fontSize="15px" fontWeight="700" color="text.heading">
          {t("book_reviews.showing_reviews", { shown: 4, total: 20 })}
        </Text>
        <Flex align="center" gap={2}>
          <Box color="brand.purple" display="flex" alignItems="center">
            <BsSortDown size={18} />
          </Box>
          <NativeSelectRoot w="120px" h="36px" border="none" bg="transparent">
            <NativeSelectField
              h="36px"
              px="4px"
              fontSize="15px"
              fontWeight="600"
              color="text.heading"
              border="none"
              _focusVisible={{ boxShadow: "none", outline: "none" }}
              defaultValue="newest"
            >
              <option value="newest">{t("book_reviews.newest")}</option>
              <option value="oldest">{t("book_reviews.oldest")}</option>
              <option value="highest">{t("book_reviews.highest")}</option>
              <option value="lowest">{t("book_reviews.lowest")}</option>
            </NativeSelectField>
            <NativeSelectIndicator color="text.muted">
              <FiChevronDown />
            </NativeSelectIndicator>
          </NativeSelectRoot>
        </Flex>
      </Flex>

      <Flex direction="column">
        {REVIEWS.map((review, i) => (
          <Flex
            key={i}
            direction="column"
            gap={3}
            px={8}
            py={5}
            borderTop="1px solid"
            borderTopColor="border.default"
          >
            <Flex justify="space-between" align="flex-start">
              <Flex align="center" gap={3}>
                <Image
                  src={review.avatar}
                  alt={review.name}
                  w="44px"
                  h="44px"
                  borderRadius="full"
                  objectFit="cover"
                  bg="bg.skeleton"
                />
                <Flex direction="column">
                  <Text fontSize="15px" fontWeight="700" color="text.heading">
                    {review.name}
                  </Text>
                  <Text fontSize="12px" color="text.muted" fontWeight="400">
                    {review.date}
                  </Text>
                </Flex>
              </Flex>

              <Flex direction="column" align="flex-end" gap={0.5}>
                <Text fontSize="24px" fontWeight="800" color="brand.orange">
                  {review.rating.toFixed(1)}
                </Text>
                <StarRating rating={review.rating} size={16} />
              </Flex>
            </Flex>

            <Text fontSize="14px" color="text.muted" lineHeight="1.7">
              {review.text}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Box px={8} pb={8} pt={2}>
        <Flex
          as="button"
          align="center"
          justify="center"
          w="full"
          h="50px"
          bg="brand.purple"
          color="text.onBrand"
          borderRadius="12px"
          fontSize="15px"
          fontWeight="700"
          cursor="pointer"
          transition="opacity 0.15s"
          _hover={{ opacity: 0.9 }}
        >
          {t("book_reviews.view_more")}
        </Flex>
      </Box>
    </Flex>
  );
};

export default BookReviews;
