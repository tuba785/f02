import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { useTranslation } from "react-i18next";

const BOOKS = [
  {
    id: "77",
    title: "Automated encompassing throughput",
    subtitle: "YOUNG-ADULT, ENGLISH, E-BOOK",
    rating: 5,
    reviews: 463,
    price: 43.55,
    oldPrice: 58.85,
    cover: "https://picsum.photos/seed/book77",
  },
  {
    id: "91",
    title: "Polarised grid-enabled encoding",
    subtitle: "ROMANCE, CHINESE, PAPERBACK",
    rating: 5,
    reviews: 530,
    price: 48.65,
    oldPrice: null,
    cover: "https://picsum.photos/seed/book91",
  },
  {
    id: "53",
    title: "Fully-configurable bottom-line workforce",
    subtitle: "SCI-FI, HINDI, PAPERBACK",
    rating: 4.9,
    reviews: 67,
    price: 95.53,
    oldPrice: null,
    cover: "https://picsum.photos/seed/book53",
  },
];

const RelatedBooks = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Flex
      direction="column"
      bg="bg.surface"
      borderRadius="20px"
      w="full"
      maxW="400px"
    >
      {BOOKS.map((book, i) => (
        <Link
          key={book.id}
          to={`/books/${book.id}`}
          style={{ textDecoration: "none" }}
        >
          <Flex
            gap={4}
            px={6}
            py={5}
            align="flex-start"
            borderTop={i === 0 ? "none" : "1px solid"}
            borderTopColor={i === 0 ? "transparent" : "border.default"}
            cursor="pointer"
          >
            <Box
              w="100px"
              minW="100px"
              h="130px"
              bg="bg.skeleton"
              borderRadius="10px"
              overflow="hidden"
              flexShrink={0}
            >
              <Image
                src={`${book.cover}/100/130`}
                alt={book.title}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>

            <Flex direction="column" gap={1.5} flex={1} minW={0}>
              <Text
                fontSize="15px"
                fontWeight="700"
                color="text.heading"
                lineClamp={1}
              >
                {book.title}
              </Text>
              <Text
                fontSize="11px"
                fontWeight="600"
                color="brand.purple"
                textTransform="uppercase"
                letterSpacing="0.3px"
              >
                {book.subtitle}
              </Text>

              <Flex align="center" gap={1.5} mt={0.5}>
                <FaStar size={13} color="var(--chakra-colors-brand-orange)" />
                <Text fontSize="14px" fontWeight="700" color="brand.orange">
                  {book.rating}
                </Text>
                <Text fontSize="12px" color="text.muted">
                  {book.reviews} {t("book_detail.reviews").toLowerCase()}
                </Text>
              </Flex>

              <Flex align="baseline" gap={1.5}>
                <Text fontSize="16px" fontWeight="800" color="text.heading">
                  ${book.price}
                </Text>
                {book.oldPrice && (
                  <Text
                    fontSize="13px"
                    fontWeight="400"
                    color="text.muted"
                    textDecoration="line-through"
                  >
                    ${book.oldPrice}
                  </Text>
                )}
              </Flex>

              {cartItems.some((i) => i.bookId === book.id) ? (
                <Flex
                  align="center"
                  gap={1.5}
                  cursor="pointer"
                  mt={0.5}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromCart(book.id));
                  }}
                >
                  <Text fontSize="13px" fontWeight="700" color="brand.purple">
                    {t("book_list.already_in_cart")}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  align="center"
                  gap={1.5}
                  cursor="pointer"
                  mt={0.5}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addToCart({ bookId: book.id }));
                  }}
                >
                  <FiShoppingCart
                    size={14}
                    color="var(--chakra-colors-brand-purple)"
                  />
                  <Text fontSize="13px" fontWeight="700" color="brand.purple">
                    {t("book_list.add_to_cart")}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Link>
      ))}

      <Box px={6} pb={6} pt={2}>
        <Flex
          as="button"
          align="center"
          justify="center"
          w="full"
          h="44px"
          color="brand.purple"
          bgColor="brand.lightPurple"
          borderRadius="10px"
          fontSize="14px"
          fontWeight="700"
          cursor="pointer"
          transition="background 0.15s"
          _hover={{ bgColor: "brand.purple", color: "text.onBrand" }}
        >
          {t("book_detail.view_more")}
        </Flex>
      </Box>
    </Flex>
  );
};

export default RelatedBooks;
