import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const RightFooter = () => {
  return (
    <VStack align="start" gap={4} maxW="340px">
      <Text fontSize="16px" fontWeight="700" color="gray.800">
        Our Store
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
          <Box color={PRIMARY_PURPLE} mt="2px">
            <FiMapPin size={18} />
          </Box>
          <Text fontSize="14px" color="gray.600" lineHeight="1.6">
            832 Thompson Drive, San Fransisco CA 94107, United States
          </Text>
        </HStack>

        <HStack gap={3} align="center">
          <Box color={PRIMARY_PURPLE}>
            <FiPhone size={18} />
          </Box>
          <Text fontSize="14px" color="gray.600">
            +123 345123 556
          </Text>
        </HStack>

        <HStack gap={3} align="center">
          <Box color={PRIMARY_PURPLE}>
            <FiMail size={18} />
          </Box>
          <Text fontSize="14px" color="gray.600">
            support@bookoe.id
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default RightFooter;
