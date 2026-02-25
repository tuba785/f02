import { Box, IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";

const FavoritesButton = () => {
  return (
    <Box position="relative">
      <IconButton
        aria-label="Favorites"
        variant="outline"
        borderColor="gray.200"
        color="gray.600"
        bg="white"
        h="44px"
        w="44px"
        borderRadius="14px"
        _hover={{
          bg: "#f0f0f0",
          color: PRIMARY_PURPLE,
          borderColor: "#d9d5ff",
        }}
      >
        <FiHeart />
      </IconButton>
      <Box
        position="absolute"
        top="-6px"
        right="-6px"
        minW="18px"
        h="18px"
        px="4px"
        borderRadius="9px"
        bg={PRIMARY_ORANGE}
        color="white"
        fontSize="10px"
        fontWeight="700"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        0
      </Box>
    </Box>
  );
};

export default FavoritesButton;
