import { Box, Grid, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import { FaBolt, FaCheckCircle, FaThumbsUp, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface FeatureItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const Features2 = () => {
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      icon: <FaBolt size={32} />,
      titleKey: "features.quick_delivery",
      descriptionKey: "features.quick_delivery_desc",
    },
    {
      icon: <FaCheckCircle size={32} />,
      titleKey: "features.secure_payment",
      descriptionKey: "features.secure_payment_desc",
    },
    {
      icon: <FaThumbsUp size={32} />,
      titleKey: "features.best_quality",
      descriptionKey: "features.best_quality_desc",
    },
    {
      icon: <FaStar size={32} />,
      titleKey: "features.return_guarantee",
      descriptionKey: "features.return_guarantee_desc",
    },
  ];

  return (
    <Box w="100%" py={16} px={8} bg="brand.lightPurple">
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={10}
        maxW="1800px"
        mx="auto"
      >
        {features.map((feature, index) => (
          <HStack key={index} gap={4} align="flex-start">
            <Box
              w="80px"
              h="80px"
              bg="brand.purple"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="text.onBrand"
              flexShrink={0}
            >
              {feature.icon}
            </Box>
            <VStack gap={2} align="flex-start">
              <Heading
                as="h2"
                fontSize="24px"
                color="text.heading"
                fontWeight={700}
              >
                {t(feature.titleKey)}
              </Heading>
              <Text fontSize="14px" color="text.muted" lineHeight="1.6">
                {t(feature.descriptionKey)}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Grid>
    </Box>
  );
};

export default Features2;
