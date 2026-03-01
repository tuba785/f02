import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import CenterFooter from "../../ui/ui-for-footer/CenterFooter";
import LeftFooter from "../../ui/ui-for-footer/LeftFooter";
import RightFooter from "../../ui/ui-for-footer/RightFooter";

const Footer = () => {
  return (
    <Box
      as="footer"
      w="100%"
      bg="bg.surface"
      borderTop="1px solid"
      borderColor="border.header"
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 8, lg: 12 }}
        py={{ base: 12, lg: 16 }}
        justify="space-between"
        align="start"
        gap={{ base: 8, lg: 12 }}
        flexWrap={{ base: "wrap", lg: "nowrap" }}
      >
        <LeftFooter />
        <CenterFooter />
        <RightFooter />
      </Flex>

      <Box
        borderTop="1px solid"
        borderColor="border.header"
        py={4}
        px={{ base: 4, md: 8, lg: 12 }}
      >
        <HStack
          maxW="1400px"
          mx="auto"
          justify="space-between"
          fontSize="13px"
          color="text.subtle"
          flexWrap="wrap"
          gap={2}
        >
          <Text>Bookoe Book Store Website - © 2026 All Rights Reserved</Text>
          <Text>
            Made with ❤️ by{" "}
            <Text as="span" fontWeight="600" color="text.strong">
              Peterdraw
            </Text>
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
