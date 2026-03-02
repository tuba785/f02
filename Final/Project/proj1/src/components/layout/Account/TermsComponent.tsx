import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TermsComponent = () => {
  const { t } = useTranslation();

  const sectionTitle = {
    fontSize: "20px",
    fontWeight: "700",
    color: "text.heading",
    mt: 6,
    mb: 3,
  };

  const paragraph = {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "text.secondary",
    mb: 3,
  };

  return (
    <Flex
      w="100%"
      justify="center"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
    >
      <Box
        w="100%"
        maxW="900px"
        bg="bg.surface"
        borderRadius="24px"
        boxShadow="lg"
        p={{ base: 8, md: 12 }}
      >
        <VStack align="stretch" gap={0}>
          <Heading fontSize="32px" fontWeight="800" color="text.heading" mb={2}>
            {t("terms.page_title")}
          </Heading>
          <Text fontSize="14px" color="text.tertiary" mb={8}>
            {t("terms.last_updated")}
          </Text>

          <Text {...paragraph}>{t("terms.intro")}</Text>

          <Text {...sectionTitle}>{t("terms.section1_title")}</Text>
          <Text {...paragraph}>{t("terms.section1_p1")}</Text>
          <Text {...paragraph}>{t("terms.section1_p2")}</Text>

          <Text {...sectionTitle}>{t("terms.section2_title")}</Text>
          <Text {...paragraph}>{t("terms.section2_p1")}</Text>
          <Text {...paragraph}>{t("terms.section2_p2")}</Text>

          <Text {...sectionTitle}>{t("terms.section3_title")}</Text>
          <Text {...paragraph}>{t("terms.section3_p1")}</Text>
          <Text {...paragraph}>{t("terms.section3_p2")}</Text>

          <Text {...sectionTitle}>{t("terms.section4_title")}</Text>
          <Text {...paragraph}>{t("terms.section4_p1")}</Text>
          <Text {...paragraph}>{t("terms.section4_p2")}</Text>

          <Text {...sectionTitle}>{t("terms.section5_title")}</Text>
          <Text {...paragraph}>{t("terms.section5_p1")}</Text>
          <Text {...paragraph}>{t("terms.section5_p2")}</Text>

          <Text {...sectionTitle}>{t("terms.section6_title")}</Text>
          <Text {...paragraph}>{t("terms.section6_p1")}</Text>

          <Text {...sectionTitle}>{t("terms.section7_title")}</Text>
          <Text {...paragraph}>{t("terms.section7_p1")}</Text>

          <Text {...sectionTitle}>{t("terms.section8_title")}</Text>
          <Text {...paragraph}>{t("terms.section8_p1")}</Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default TermsComponent;
