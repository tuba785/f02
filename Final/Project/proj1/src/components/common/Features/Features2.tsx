import { Box, Grid, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import { FaBolt, FaCheckCircle, FaThumbsUp, FaStar } from "react-icons/fa";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features2 = () => {
  const features: FeatureItem[] = [
    {
      icon: <FaBolt size={32} />,
      title: "Quick Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <FaCheckCircle size={32} />,
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <FaThumbsUp size={32} />,
      title: "Best Quality",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <FaStar size={32} />,
      title: "Return Guarantee",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
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
                {feature.title}
              </Heading>
              <Text fontSize="14px" color="text.muted" lineHeight="1.6">
                {feature.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Grid>
    </Box>
  );
};

export default Features2;
