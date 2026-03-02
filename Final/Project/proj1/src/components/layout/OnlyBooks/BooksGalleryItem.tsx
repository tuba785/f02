import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { HeartBtn, StarRating } from "./BooksBtnCom";
import type { Book } from "../../../types/book";
import { useTranslation } from "react-i18next";

interface BooksGalleryItemProps {
  book: Book;
}

const COVER_W = 230;
const COVER_H = 320;

const BooksGalleryItem = ({ book }: BooksGalleryItemProps) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const inCart = useSelector((state: RootState) =>
    state.cart.items.some((i) => i.bookId === book.id),
  );
  const hasDiscount = book.discount !== null && book.discount > 0;

  const subtitle = [book.genre, book.language, book.format]
    .filter(Boolean)
    .join(", ");

  return (
    <Box position="relative" w="275px" h="440px">
      <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
        <Flex
          direction="column"
          bg="bg.surface"
          border="1px solid"
          borderColor="border.default"
          borderRadius="16px"
          overflow="hidden"
          w="275px"
          position={hovered ? "absolute" : "relative"}
          zIndex={hovered ? 10 : 1}
          transition="box-shadow 0.25s, border-color 0.25s"
          _hover={{
            boxShadow: "0 6px 24px rgba(108,93,211,0.12)",
            borderColor: "brand.purple",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          cursor="pointer"
        >
          <Box
            position="relative"
            w={`${COVER_W}px`}
            h={`${COVER_H}px`}
            bg="bg.skeleton"
            borderRadius="12px"
            m="8px auto 0"
            overflow="hidden"
            flexShrink={0}
          >
            {book.cover && (
              <Image
                src={`${book.cover}/${COVER_W}/${COVER_H}`}
                alt={book.title}
                w="full"
                h="full"
                objectFit="cover"
              />
            )}

            <Flex
              position="absolute"
              top={2}
              left={2}
              gap={1}
              direction="column"
            >
              {hasDiscount && (
                <Flex
                  align="center"
                  justify="center"
                  bg="brand.purple"
                  color="text.onBrand"
                  fontSize="10px"
                  fontWeight="700"
                  px={2}
                  h="22px"
                  borderRadius="6px"
                >
                  -{book.discount}%
                </Flex>
              )}
              {book.is_bestseller && (
                <Flex
                  align="center"
                  justify="center"
                  bg="brand.orange"
                  color="text.onBrand"
                  fontSize="10px"
                  fontWeight="700"
                  px={2}
                  h="22px"
                  borderRadius="6px"
                >
                  B
                </Flex>
              )}
            </Flex>

            <Box position="absolute" top={2} right={2}>
              <HeartBtn bookId={book.id} />
            </Box>
          </Box>

          <Flex
            direction="column"
            align="center"
            px={3}
            pt={2}
            pb={4}
            gap={1}
            minH="100px"
            justify="center"
          >
            <Text
              fontSize="14px"
              fontWeight="700"
              color="text.strong"
              textAlign="center"
              lineClamp={1}
            >
              {book.title}
            </Text>

            {!hovered && (
              <>
                <Text
                  fontSize="11px"
                  fontWeight="500"
                  color="brand.purple"
                  textAlign="center"
                  textTransform="uppercase"
                  lineClamp={1}
                >
                  {subtitle}
                </Text>
                <Box mt={1}>
                  <StarRating rating={book.rating} size={14} justify="center" />
                </Box>
              </>
            )}

            {hovered && (
              <>
                <Flex align="baseline" gap={2} mt={1}>
                  <Text fontSize="16px" fontWeight="700" color="text.strong">
                    $ {book.discounted_price.toFixed(2)}
                  </Text>
                  {hasDiscount && (
                    <Text
                      fontSize="12px"
                      fontWeight="400"
                      color="text.muted"
                      textDecoration="line-through"
                    >
                      ${book.price.toFixed(2)}
                    </Text>
                  )}
                </Flex>
                {inCart ? (
                  <Flex
                    align="center"
                    gap={2}
                    bg="bg.surface"
                    color="brand.purple"
                    border="1.5px solid"
                    borderColor="brand.purple"
                    px={4}
                    h="34px"
                    borderRadius="8px"
                    cursor="pointer"
                    fontWeight="600"
                    fontSize="12px"
                    mt={1}
                    transition="all 0.2s"
                    _hover={{ bg: "brand.lightPurple" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(removeFromCart(book.id));
                    }}
                  >
                    <Text>{t("book_list.already_in_cart")}</Text>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    gap={2}
                    bg="brand.purple"
                    color="text.onBrand"
                    px={4}
                    h="34px"
                    borderRadius="8px"
                    cursor="pointer"
                    fontWeight="600"
                    fontSize="12px"
                    mt={1}
                    transition="opacity 0.15s"
                    _hover={{ opacity: 0.85 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        navigate("/login");
                        return;
                      }
                      dispatch(addToCart({ bookId: book.id }));
                    }}
                  >
                    <FiShoppingCart size={14} />
                    <Text>{t("book_list.add_to_cart")}</Text>
                  </Flex>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default BooksGalleryItem;
