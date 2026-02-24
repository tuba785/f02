import { Box, Button, HStack } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

const AuthActions = () => {
  return (
    <HStack gap={3}>
      <Button
        variant="ghost"
        color="#7466d5"
        h="44px"
        px="16px"
        bg="#f0e9ff"
        borderRadius="14px"
        fontWeight="600"
        _hover={{ bg: "#e0d4ff" }}
      >
        Log In
      </Button>
      <Button
        display="flex"
        alignItems="center"
        gap={2}
        bg="#6C63FF"
        color="white"
        h="44px"
        px="18px"
        borderRadius="14px"
        _hover={{ bg: "#5b53e6" }}
      >
        <FiUser />
        <Box as="span">Sign Up</Box>
      </Button>
    </HStack>
  );
};

export default AuthActions;
