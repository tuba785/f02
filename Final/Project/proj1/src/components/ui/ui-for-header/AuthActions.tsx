import { Box, Button, HStack } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/authSlice";
const AuthActions = () => {
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(login());
    window.location.reload();
  };

  return (
    <HStack gap={3}>
      <Button
        variant="ghost"
        color="brand.purple"
        h="44px"
        px="16px"
        bg="brand.lightPurple"
        borderRadius="14px"
        fontWeight="600"
        _hover={{ opacity: 0.8 }}
      >
        Log In
      </Button>
      <Button
        display="flex"
        alignItems="center"
        gap={2}
        bg="brand.purple"
        color="text.onBrand"
        h="44px"
        px="18px"
        borderRadius="14px"
        _hover={{ opacity: 0.85 }}
        onClick={handleSignUp}
      >
        <FiUser />
        <Box as="span">Sign Up</Box>
      </Button>
    </HStack>
  );
};

export default AuthActions;
