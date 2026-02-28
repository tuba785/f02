import { useState } from "react";
import { createPortal } from "react-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { PRIMARY_PURPLE, PRIMARY_ORANGE } from "../../../styles/colors";
import Favorite from "../../layout/Modals/Favorite";

const FavoritesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const count = useSelector((state: RootState) => state.favorites.ids.length);

  return (
    <>
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
          onClick={() => setIsOpen(true)}
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
          {count}
        </Box>
      </Box>

      {createPortal(
        <Favorite isOpen={isOpen} onClose={() => setIsOpen(false)} />,
        document.body,
      )}
    </>
  );
};

export default FavoritesButton;
