import { Box, Flex, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PRIMARY_PURPLE } from "../../../styles/colors";

interface AddToCartBtnProps {
  onClick?: () => void;
}

export const AddToCartBtn = ({ onClick }: AddToCartBtnProps) => (
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
    onClick={onClick}
  >
    <FiShoppingCart size={16} />
    <Text>Add to cart</Text>
  </Flex>
);

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
  onClick?: () => void;
}

export const HeartBtn = ({ onClick }: HeartBtnProps) => (
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
    onClick={onClick}
  >
    <FaRegHeart size={18} />
  </Box>
);

export const HeartBtnFilled = ({ onClick }: HeartBtnProps) => (
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
    onClick={onClick}
  >
    <FaHeart size={18} />
  </Box>
);
