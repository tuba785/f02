import { Box, VStack, HStack, Text, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../store/store";
import { addToCart, removeFromCart } from "../../../../store/slices/cartSlice";
import type { Book } from "../../../../types/book";
import { colors } from "../../../../styles/colors";
import { useTranslation } from "react-i18next";

interface SpecialOffersCardProps {
  book: Book;
}

const SpecialOffersCard = ({ book }: SpecialOffersCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const inCart = useSelector((state: RootState) =>
    state.cart.items.some((i) => i.bookId === book.id),
  );
  const formatPrice = (value: number) => value.toFixed(2);
  const coverUrl = `${book.cover}/450/300`;

  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
      <VStack
        align="stretch"
        gap={4}
        bg="bg.surface"
        borderRadius="lg"
        p={6}
        w="full"
        h="690px"
        boxShadow="0 10px 20px -5px rgba(0, 0, 0, 0.1)"
        cursor="pointer"
      >
        <Box
          w="full"
          h="300px"
          bg="bg.skeleton"
          borderRadius="lg"
          overflow="hidden"
        >
          {book.cover && (
            <Image
              src={coverUrl}
              alt={book.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          )}
        </Box>

        <Text fontSize="lg" fontWeight="bold" color="text.strong">
          {book.title}
        </Text>

        <HStack gap={2} flexWrap="wrap">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={colors.primary.purple}
            bg={colors.primary.lightPurple}
            px={3}
            py={1}
            borderRadius="md"
            textTransform="uppercase"
          >
            {book.genre}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={colors.primary.purple}
            bg={colors.primary.lightPurple}
            px={3}
            py={1}
            borderRadius="md"
            textTransform="uppercase"
          >
            {book.language}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={colors.primary.purple}
            bg={colors.primary.lightPurple}
            px={3}
            py={1}
            borderRadius="md"
            textTransform="uppercase"
          >
            {book.format}
          </Text>
        </HStack>

        <Text fontSize="sm" color="text.muted" lineHeight="tall" flex={1}>
          {book.description}
        </Text>

        <Text fontSize="sm" fontWeight="semibold" color="text.strong">
          {book.author}
        </Text>

        <HStack justify="space-between" align="center" w="full">
          {inCart ? (
            <Button
              bg="bg.surface"
              color={colors.primary.purple}
              border={`1.5px solid ${colors.primary.purple}`}
              _hover={{ bg: colors.primary.lightPurple }}
              fontSize="sm"
              fontWeight="semibold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(removeFromCart(book.id));
              }}
            >
              <Text>{t("special_offers.already_in_cart")}</Text>
            </Button>
          ) : (
            <Button
              bg={colors.primary.purple}
              color="text.onBrand"
              _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
              fontSize="sm"
              fontWeight="semibold"
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
              <HStack gap={2}>
                <FaShoppingCart />
                <Text>{t("special_offers.add_to_cart")}</Text>
              </HStack>
            </Button>
          )}

          <HStack gap={2}>
            <Text fontSize="md" fontWeight="bold" color={colors.primary.purple}>
              ${formatPrice(book.discounted_price)}
            </Text>
            <Text
              fontSize="sm"
              color="text.muted"
              textDecoration="line-through"
            >
              ${formatPrice(book.price)}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Link>
  );
};

export default SpecialOffersCard;
