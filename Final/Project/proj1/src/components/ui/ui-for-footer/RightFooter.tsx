import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const RightFooter = () => {
  const { t } = useTranslation();

  return (
    <VStack align="start" gap={4} maxW="340px">
      <Text fontSize="16px" fontWeight="700" color="text.strong">
        {t("footer.our_store")}
      </Text>

      <Image
        src="/bookoe-place-footer.jpeg"
        alt="Our store location"
        w="100%"
        h="160px"
        objectFit="cover"
        borderRadius="12px"
      />

      <VStack align="start" gap={3} w="100%">
        <HStack gap={3} align="start">
          <Box color="brand.purple" mt="2px">
            <FiMapPin size={18} />
          </Box>
          <Text fontSize="14px" color="text.subtle" lineHeight="1.6">
            {t("footer.address")}
          </Text>
        </HStack>

        <HStack gap={3} align="center">
          <Box color="brand.purple">
            <FiPhone size={18} />
          </Box>
          <Text fontSize="14px" color="text.subtle">
            +123 345123 556
          </Text>
        </HStack>

        <HStack gap={3} align="center">
          <Box color="brand.purple">
            <FiMail size={18} />
          </Box>
          <Text fontSize="14px" color="text.subtle">
            support@bookoe.id
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default RightFooter;
