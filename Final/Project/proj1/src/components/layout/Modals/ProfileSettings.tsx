import { Box, Flex, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettings = ({ isOpen, onClose }: ProfileSettingsProps) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      backdropFilter="blur(4px)"
      zIndex={3300}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="16px"
        w="480px"
        maxW="90%"
        p={8}
        boxShadow="0 16px 48px rgba(0,0,0,0.18)"
        onClick={(e) => e.stopPropagation()}
      >
        <Flex align="center" justify="space-between" mb={6}>
          <Text fontSize="20px" fontWeight="800" color="#11142d">
            Account Settings
          </Text>
          <Flex
            align="center"
            justify="center"
            w="36px"
            h="36px"
            borderRadius="10px"
            cursor="pointer"
            transition="background 0.15s"
            _hover={{ bg: "#f0f0f0" }}
            onClick={onClose}
          >
            <FiX size={20} color="#808191" />
          </Flex>
        </Flex>

        <Flex
          align="center"
          justify="center"
          py={12}
          direction="column"
          gap={3}
        >
          <Box
            w="56px"
            h="56px"
            borderRadius="full"
            bg={`${PRIMARY_PURPLE}18`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="22px">⚙️</Text>
          </Box>
          <Text fontSize="15px" fontWeight="600" color="#11142d">
            Settings coming soon
          </Text>
          <Text fontSize="13px" color="#808191" textAlign="center" maxW="300px">
            Account settings and profile customization will be available in a
            future update.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
