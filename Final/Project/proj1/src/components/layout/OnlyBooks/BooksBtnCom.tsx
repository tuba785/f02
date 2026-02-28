import { Box, Flex, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { toggleFavorite } from "../../../store/slices/favoritesSlice";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";

interface StarRatingProps {
  rating: number;
  size?: number;
  justify?: string;
}

export const StarRating = ({ rating, size = 16, justify }: StarRatingProps) => {
  const full = Math.floor(rating);
  const fraction = rating - full;

  return (
    <Flex gap="2px" justify={justify}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= full)
          return <FaStar key={i} size={size} color={PRIMARY_ORANGE} />;
        if (i === full + 1 && fraction > 0) {
          const pct = Math.round(fraction * 100);
          return (
            <Box key={i} position="relative" w={`${size}px`} h={`${size}px`}>
              <FaStar size={size} color="#e0e0e0" />
              <Box
                position="absolute"
                top={0}
                left={0}
                overflow="hidden"
                w={`${pct}%`}
                h="full"
              >
                <FaStar size={size} color={PRIMARY_ORANGE} />
              </Box>
            </Box>
          );
        }
        return <FaStar key={i} size={size} color="#e0e0e0" />;
      })}
    </Flex>
  );
};

interface AddToCartBtnProps {
  bookId?: string;
  qty?: number;
  onClick?: () => void;
}

export const AddToCartBtn = ({
  bookId,
  qty = 1,
  onClick,
}: AddToCartBtnProps) => {
  const dispatch = useDispatch();
  const inCart = useSelector((state: RootState) =>
    bookId ? state.cart.items.some((i) => i.bookId === bookId) : false,
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookId) dispatch(addToCart({ bookId, qty }));
    onClick?.();
  };

  if (inCart) {
    return (
      <Flex
        align="center"
        gap={2}
        bg="white"
        color={PRIMARY_PURPLE}
        border={`1.5px solid ${PRIMARY_PURPLE}`}
        px={5}
        h="44px"
        borderRadius="10px"
        cursor="pointer"
        fontWeight="600"
        fontSize="14px"
        transition="all 0.2s"
        _hover={{ bg: "#f0eeff" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (bookId) dispatch(removeFromCart(bookId));
        }}
      >
        <Text>Already in cart</Text>
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      gap={2}
      bg={PRIMARY_PURPLE}
      color="white"
      px={5}
      h="44px"
      borderRadius="10px"
      cursor="pointer"
      fontWeight="600"
      fontSize="14px"
      transition="all 0.2s"
      _hover={{ opacity: 0.85 }}
      onClick={handleClick}
    >
      <FiShoppingCart size={16} />
      <Text>Add to cart</Text>
    </Flex>
  );
};

interface AlreadyInCartBtnProps {
  onClick?: () => void;
}

export const AlreadyInCartBtn = ({ onClick }: AlreadyInCartBtnProps) => (
  <Flex
    align="center"
    gap={2}
    bg="white"
    color={PRIMARY_PURPLE}
    border={`1.5px solid ${PRIMARY_PURPLE}`}
    px={5}
    h="44px"
    borderRadius="10px"
    cursor="pointer"
    fontWeight="600"
    fontSize="14px"
    transition="all 0.2s"
    _hover={{ bg: "#f0eeff" }}
    onClick={onClick}
  >
    <Text>Already in cart</Text>
  </Flex>
);

interface HeartBtnProps {
  bookId?: string;
  onClick?: () => void;
}

export const HeartBtn = ({ bookId, onClick }: HeartBtnProps) => {
  const dispatch = useDispatch();
  const isFav = useSelector((state: RootState) =>
    bookId ? state.favorites.ids.includes(bookId) : false,
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookId) dispatch(toggleFavorite(bookId));
    onClick?.();
  };

  return (
    <Box
      w="44px"
      h="44px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="10px"
      border={`1.5px solid ${PRIMARY_PURPLE}`}
      bg="white"
      color={PRIMARY_PURPLE}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: "#f0eeff" }}
      onClick={handleClick}
    >
      {isFav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
    </Box>
  );
};

export const HeartBtnFilled = ({ bookId, onClick }: HeartBtnProps) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookId) dispatch(toggleFavorite(bookId));
    onClick?.();
  };

  return (
    <Box
      w="44px"
      h="44px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="10px"
      border={`1.5px solid ${PRIMARY_PURPLE}`}
      bg="white"
      color={PRIMARY_PURPLE}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: "#f0eeff" }}
      onClick={handleClick}
    >
      <FaHeart size={18} />
    </Box>
  );
};
