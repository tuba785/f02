import { Box, Button } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const ProfileButton = () => {
  return (
    <Button
      display="flex"
      alignItems="center"
      gap={2}
      bg={PRIMARY_PURPLE}
      color="white"
      h="44px"
      px="18px"
      borderRadius="14px"
      _hover={{ opacity: 0.85 }}
    >
      <FiUser />
      <Box as="span">Profile</Box>
    </Button>
  );
};

export default ProfileButton;
