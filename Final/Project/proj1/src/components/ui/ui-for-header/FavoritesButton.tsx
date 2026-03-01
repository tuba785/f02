import { useState } from "react";
import { createPortal } from "react-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
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
          borderColor="border.header"
          color="text.subtle"
          bg="bg.surface"
          h="44px"
          w="44px"
          borderRadius="14px"
          _hover={{
            bg: "hover.surface",
            color: "brand.purple",
            borderColor: "border.brandHover",
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
          bg="brand.orange"
          color="text.onBrand"
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
