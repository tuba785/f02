import { IconButton } from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";

const ThemeButton = () => {
  return (
    <IconButton
      aria-label="Theme"
      variant="outline"
      borderColor="gray.200"
      color="gray.600"
      bg="white"
      h="44px"
      w="44px"
      borderRadius="14px"
      _hover={{ bg: "#f0f0f0", color: "#6c5dd3", borderColor: "#d9d5ff" }}
    >
      <FiSun />
    </IconButton>
  );
};

export default ThemeButton;
