import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";
import { HeartBtn, StarRating } from "./BooksBtnCom";
import type { Book } from "../../../types/book";

interface BooksGalleryItemProps {
  book: Book;
}

const COVER_W = 230;
const COVER_H = 320;

const BooksGalleryItem = ({ book }: BooksGalleryItemProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
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
          bg="white"
          border="1px solid #e8e8e8"
          borderRadius="16px"
          overflow="hidden"
          w="275px"
          position={hovered ? "absolute" : "relative"}
          zIndex={hovered ? 10 : 1}
          transition="box-shadow 0.25s, border-color 0.25s"
          _hover={{
            boxShadow: "0 6px 24px rgba(108,93,211,0.12)",
            borderColor: PRIMARY_PURPLE,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          cursor="pointer"
        >
          <Box
            position="relative"
            w={`${COVER_W}px`}
            h={`${COVER_H}px`}
            bg="#e0e0e0"
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
                  bg={PRIMARY_PURPLE}
                  color="white"
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
                  bg={PRIMARY_ORANGE}
                  color="white"
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
              color="#11142d"
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
                  color={PRIMARY_PURPLE}
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
                  <Text fontSize="16px" fontWeight="700" color="#11142d">
                    $ {book.discounted_price.toFixed(2)}
                  </Text>
                  {hasDiscount && (
                    <Text
                      fontSize="12px"
                      fontWeight="400"
                      color="#b0b7c3"
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
                    bg="white"
                    color={PRIMARY_PURPLE}
                    border={`1.5px solid ${PRIMARY_PURPLE}`}
                    px={4}
                    h="34px"
                    borderRadius="8px"
                    cursor="pointer"
                    fontWeight="600"
                    fontSize="12px"
                    mt={1}
                    transition="all 0.2s"
                    _hover={{ bg: "#f0eeff" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(removeFromCart(book.id));
                    }}
                  >
                    <Text>Already in cart</Text>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    gap={2}
                    bg={PRIMARY_PURPLE}
                    color="white"
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
                      dispatch(addToCart({ bookId: book.id }));
                    }}
                  >
                    <FiShoppingCart size={14} />
                    <Text>Add to cart</Text>
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
