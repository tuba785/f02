import { Box, Flex, Text } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettings = ({ isOpen, onClose }: ProfileSettingsProps) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="overlay.heavy"
      backdropFilter="blur(4px)"
      zIndex={3300}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="bg.surface"
        borderRadius="16px"
        w="480px"
        maxW="90%"
        p={8}
        boxShadow="0 16px 48px rgba(0,0,0,0.18)"
        onClick={(e) => e.stopPropagation()}
      >
        <Flex align="center" justify="space-between" mb={6}>
          <Text fontSize="20px" fontWeight="800" color="text.primary">
            {t("profile_settings.title")}
          </Text>
          <Flex
            align="center"
            justify="center"
            w="36px"
            h="36px"
            borderRadius="10px"
            cursor="pointer"
            transition="background 0.15s"
            _hover={{ bg: "hover.surface" }}
            onClick={onClose}
          >
            <FiX size={20} color="var(--chakra-colors-text-secondary)" />
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
            bg="brand.purpleFaint"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="22px">⚙️</Text>
          </Box>
          <Text fontSize="15px" fontWeight="600" color="text.primary">
            {t("profile_settings.coming_soon")}
          </Text>
          <Text
            fontSize="13px"
            color="text.secondary"
            textAlign="center"
            maxW="300px"
          >
            {t("profile_settings.description")}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
