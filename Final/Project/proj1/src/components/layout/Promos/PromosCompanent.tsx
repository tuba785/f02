import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const PROMO_IMAGES = [
  "https://picsum.photos/seed/promo1/480/320",
  "https://picsum.photos/seed/promo2/480/320",
  "https://picsum.photos/seed/promo3/480/320",
  "https://picsum.photos/seed/promo4/480/320",
];

const PromosCompanent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const promos = [0, 1, 2, 3].map((i) => ({
    title: t(`banner1.slides.${i}.title`),
    subtitle: t(`banner1.slides.${i}.subtitle`),
    badge: t(`banner1.slides.${i}.badge`),
    description: t(`banner1.slides.${i}.description`),
    details: t(`promos.items.${i}.details`),
    image: PROMO_IMAGES[i],
  }));

  return (
    <Flex
      w="100%"
      justify="center"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
    >
      <Box w="100%" maxW="1100px">
        <VStack align="stretch" gap={0} mb={10}>
          <Heading fontSize="36px" fontWeight="800" color="text.heading" mb={2}>
            {t("promos.page_title")}
          </Heading>
          <Text fontSize="16px" color="text.secondary" maxW="600px">
            {t("promos.page_subtitle")}
          </Text>
        </VStack>

        <VStack gap={10} align="stretch">
          {promos.map((promo, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <Flex
                key={index}
                bg="bg.surface"
                borderRadius="20px"
                boxShadow="md"
                overflow="hidden"
                flexDirection={{
                  base: "column",
                  md: isReversed ? "row-reverse" : "row",
                }}
                transition="box-shadow 0.3s ease"
                _hover={{ boxShadow: "xl" }}
              >
                <Box
                  flexShrink={0}
                  w={{ base: "100%", md: "420px" }}
                  h={{ base: "220px", md: "auto" }}
                  minH={{ md: "320px" }}
                  overflow="hidden"
                >
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.4s ease"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>

                <Flex
                  flex={1}
                  direction="column"
                  justify="center"
                  p={{ base: 6, md: 10 }}
                  gap={4}
                >
                  <Text
                    fontSize="13px"
                    fontWeight="700"
                    color="brand.purple"
                    letterSpacing="2px"
                    textTransform="uppercase"
                  >
                    {promo.badge}
                  </Text>

                  <Heading
                    fontSize={{ base: "26px", md: "32px" }}
                    fontWeight="700"
                    color="text.heading"
                    lineHeight="1.2"
                  >
                    {promo.title}
                  </Heading>

                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="text.heading"
                    lineHeight="1.4"
                  >
                    {promo.subtitle}
                  </Text>

                  <Text fontSize="14px" color="text.secondary" lineHeight="1.8">
                    {promo.description}
                  </Text>

                  <Text fontSize="14px" color="text.tertiary" lineHeight="1.8">
                    {promo.details}
                  </Text>

                  <Box mt={2}>
                    <Button
                      backgroundColor="brand.purple"
                      color="text.onBrand"
                      height="46px"
                      paddingX="28px"
                      paddingY="12px"
                      borderRadius="8px"
                      fontSize="15px"
                      fontWeight="600"
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      gap="8px"
                      _hover={{
                        opacity: 0.9,
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.3s ease"
                      onClick={() => navigate("/purchase")}
                    >
                      {t("banner1.get_the_deal")}
                      <HiArrowRight size={18} />
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

export default PromosCompanent;
