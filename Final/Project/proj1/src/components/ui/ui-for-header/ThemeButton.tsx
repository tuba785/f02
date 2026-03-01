import { IconButton } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useColorMode } from "../color-mode";

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle theme"
      variant="outline"
      border="1px solid"
      borderColor="border.subtle"
      color="text.subtle"
      bg="bg.surface"
      h="44px"
      w="44px"
      borderRadius="14px"
      onClick={toggleColorMode}
      _hover={{
        bg: "hover.surface",
        color: "brand.purple",
        borderColor: "border.brandHover",
      }}
    >
      {isDark ? <FiMoon /> : <FiSun />}
    </IconButton>
  );
};

export default ThemeButton;
