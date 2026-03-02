import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  FiBook,
  FiUsers,
  FiTruck,
  FiShield,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiAward,
} from "react-icons/fi";

const AboutUsCompanent = () => {
  const { t } = useTranslation();

  const sectionTitle = {
    fontSize: { base: "26px", md: "32px" },
    fontWeight: "800",
    color: "text.heading",
    mb: 3,
  };

  const sectionSubtitle = {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "text.secondary",
    maxW: "700px",
  };

  const paragraph = {
    fontSize: "14px",
    lineHeight: "1.8",
    color: "text.secondary",
  };

  const statIcons = [FiBook, FiUsers, FiTruck, FiGlobe];
  const statKeys = ["books", "customers", "deliveries", "countries"] as const;

  const valueIcons = [FiHeart, FiTarget, FiAward, FiShield];
  const valueKeys = ["passion", "mission", "quality", "trust"] as const;

  const teamMembers = [
    { key: "member1" },
    { key: "member2" },
    { key: "member3" },
    { key: "member4" },
  ];

  return (
    <Flex
      w="100%"
      direction="column"
      align="center"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
      gap={{ base: 12, md: 16 }}
    >
      <Box w="100%" maxW="1100px" textAlign="center">
        <VStack gap={4}>
          <Text
            fontSize="13px"
            fontWeight="700"
            color="brand.purple"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            {t("about.badge")}
          </Text>
          <Heading {...sectionTitle} fontSize={{ base: "32px", md: "42px" }}>
            {t("about.hero_title")}
          </Heading>
          <Text {...sectionSubtitle} mx="auto">
            {t("about.hero_description")}
          </Text>
        </VStack>
      </Box>

      <Box
        w="100%"
        maxW="1100px"
        bg="bg.surface"
        borderRadius="24px"
        boxShadow="lg"
        p={{ base: 8, md: 12 }}
      >
        <Heading {...sectionTitle} mb={6}>
          {t("about.story_title")}
        </Heading>
        <VStack align="stretch" gap={4}>
          <Text {...paragraph}>{t("about.story_p1")}</Text>
          <Text {...paragraph}>{t("about.story_p2")}</Text>
          <Text {...paragraph}>{t("about.story_p3")}</Text>
        </VStack>
      </Box>

      <Box w="100%" maxW="1100px">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={6}>
          {statKeys.map((key, i) => {
            const StatIcon = statIcons[i];
            return (
              <Flex
                key={key}
                direction="column"
                align="center"
                bg="bg.surface"
                borderRadius="20px"
                boxShadow="md"
                p={{ base: 6, md: 8 }}
                gap={3}
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)" }}
              >
                <Flex
                  w="56px"
                  h="56px"
                  borderRadius="16px"
                  bg="brand.lightPurple"
                  align="center"
                  justify="center"
                >
                  <Icon as={StatIcon} boxSize="24px" color="brand.purple" />
                </Flex>
                <Text
                  fontSize={{ base: "28px", md: "34px" }}
                  fontWeight="800"
                  color="text.heading"
                >
                  {t(`about.stats.${key}_count`)}
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="text.secondary"
                  textAlign="center"
                >
                  {t(`about.stats.${key}`)}
                </Text>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Box>

      <Box w="100%" maxW="1100px" textAlign="center">
        <VStack gap={4} mb={10}>
          <Heading {...sectionTitle}>{t("about.values_title")}</Heading>
          <Text {...sectionSubtitle} mx="auto">
            {t("about.values_description")}
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
          {valueKeys.map((key, i) => {
            const ValIcon = valueIcons[i];
            return (
              <Box
                key={key}
                bg="bg.surface"
                borderRadius="20px"
                boxShadow="md"
                p={{ base: 6, md: 8 }}
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)" }}
              >
                <Flex
                  w="52px"
                  h="52px"
                  borderRadius="14px"
                  bg="brand.lightPurple"
                  align="center"
                  justify="center"
                  mx="auto"
                  mb={4}
                >
                  <Icon as={ValIcon} boxSize="22px" color="brand.purple" />
                </Flex>
                <Text
                  fontSize="16px"
                  fontWeight="700"
                  color="text.heading"
                  mb={2}
                >
                  {t(`about.values.${key}_title`)}
                </Text>
                <Text fontSize="13px" lineHeight="1.7" color="text.secondary">
                  {t(`about.values.${key}_desc`)}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      <Box w="100%" maxW="1100px" textAlign="center">
        <VStack gap={4} mb={10}>
          <Heading {...sectionTitle}>{t("about.team_title")}</Heading>
          <Text {...sectionSubtitle} mx="auto">
            {t("about.team_description")}
          </Text>
        </VStack>

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {teamMembers.map(({ key }) => (
            <Box
              key={key}
              bg="bg.surface"
              borderRadius="20px"
              boxShadow="md"
              p={{ base: 5, md: 6 }}
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-4px)" }}
            >
              <Flex
                w={{ base: "72px", md: "88px" }}
                h={{ base: "72px", md: "88px" }}
                borderRadius="50%"
                bg="brand.lightPurple"
                align="center"
                justify="center"
                mx="auto"
                mb={4}
                fontSize={{ base: "28px", md: "34px" }}
                fontWeight="700"
                color="brand.purple"
              >
                {t(`about.team.${key}_name`)
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")}
              </Flex>
              <Text fontSize="15px" fontWeight="700" color="text.heading">
                {t(`about.team.${key}_name`)}
              </Text>
              <Text
                fontSize="12px"
                color="brand.purple"
                fontWeight="600"
                mt={1}
              >
                {t(`about.team.${key}_role`)}
              </Text>
              <Text
                fontSize="12px"
                color="text.secondary"
                mt={2}
                lineHeight="1.6"
              >
                {t(`about.team.${key}_bio`)}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box
        w="100%"
        maxW="1100px"
        bg="bg.surface"
        borderRadius="24px"
        boxShadow="lg"
        p={{ base: 8, md: 12 }}
      >
        <Heading {...sectionTitle} mb={6} textAlign="center">
          {t("about.why_title")}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {(["reason1", "reason2", "reason3", "reason4"] as const).map(
            (key) => (
              <Flex key={key} gap={4} align="flex-start">
                <Flex
                  minW="40px"
                  h="40px"
                  borderRadius="12px"
                  bg="brand.lightPurple"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="18px" fontWeight="700" color="brand.purple">
                    ✓
                  </Text>
                </Flex>
                <Box>
                  <Text
                    fontSize="15px"
                    fontWeight="700"
                    color="text.heading"
                    mb={1}
                  >
                    {t(`about.why.${key}_title`)}
                  </Text>
                  <Text fontSize="13px" color="text.secondary" lineHeight="1.7">
                    {t(`about.why.${key}_desc`)}
                  </Text>
                </Box>
              </Flex>
            ),
          )}
        </SimpleGrid>
      </Box>

      <Box
        w="100%"
        maxW="1100px"
        bg="brand.lightPurple"
        borderRadius="24px"
        p={{ base: 8, md: 12 }}
        textAlign="center"
      >
        <Heading
          fontSize={{ base: "22px", md: "28px" }}
          fontWeight="800"
          color="brand.purple"
          mb={4}
        >
          {t("about.contact_title")}
        </Heading>
        <Text fontSize="14px" color="text.secondary" mb={6} lineHeight="1.8">
          {t("about.contact_description")}
        </Text>
        <VStack gap={2}>
          <Text fontSize="14px" fontWeight="600" color="text.heading">
            ✉ support@bookoe.com
          </Text>
          <Text fontSize="14px" fontWeight="600" color="text.heading">
            ☎ +1 (415) 555-0132
          </Text>
          <Text fontSize="14px" fontWeight="600" color="text.heading">
            📍 832 Thompson Drive, San Francisco CA 94107, United States
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AboutUsCompanent;
