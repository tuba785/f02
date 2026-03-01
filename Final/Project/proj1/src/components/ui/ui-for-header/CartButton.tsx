import { useState } from "react";
import { createPortal } from "react-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Cart from "../../layout/Modals/Cart";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, ci) => sum + ci.qty, 0),
  );

  return (
    <>
      <Box position="relative">
        <IconButton
          aria-label="Cart"
          variant="outline"
          border="1px solid"
          borderColor="border.subtle"
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
          <FiShoppingCart />
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
          {totalItems}
        </Box>
      </Box>

      {createPortal(
        <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />,
        document.body,
      )}
    </>
  );
};

export default CartButton;
