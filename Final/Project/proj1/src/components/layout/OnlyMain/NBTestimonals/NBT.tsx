import { Box, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import { colors } from "../../../../styles/colors";
import { TestimonialCard } from "./NBT2";
import type { Testimonial } from "./NBT2";
import NBT3 from "./NBT3";
import { useTranslation } from "react-i18next";

const NBT = () => {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: t("testimonials.items.0.text"),
      name: t("testimonials.items.0.name"),
      role: t("testimonials.items.0.role"),
      image: "https://picsum.photos/seed/us1/50/50",
    },
    {
      id: 2,
      text: t("testimonials.items.1.text"),
      name: t("testimonials.items.1.name"),
      role: t("testimonials.items.1.role"),
      image: "https://picsum.photos/seed/us2/50/50",
    },
    {
      id: 3,
      text: t("testimonials.items.2.text"),
      name: t("testimonials.items.2.name"),
      role: t("testimonials.items.2.role"),
      image: "https://picsum.photos/seed/us3/50/50",
    },
  ];

  return (
    <Box py={16} px={4} bg="bg.page" h="750px">
      <VStack gap={8} maxW="1400px" mx="auto" h="full">
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="text.heading"
          >
            {t("testimonials.title")}
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="text.muted"
            maxW="600px"
          >
            {t("testimonials.description")}
          </Text>
        </VStack>

        <HStack gap={3}>
          <NBT3 seed="us4" />
          <NBT3 seed="us5" />
          <NBT3 seed="us6" />
          <NBT3 seed="us7" />
          <Box
            w="50px"
            h="50px"
            bg={colors.primary.purple}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="text.onBrand" fontSize="xs" fontWeight="bold">
              21k+
            </Text>
          </Box>
        </HStack>

        <HStack
          gap={6}
          justify="center"
          align="center"
          w="full"
          h="full"
          overflow="hidden"
          px={4}
        >
          <Box display={{ base: "none", lg: "block" }}>
            <TestimonialCard
              testimonial={testimonials[0]}
              scale={0.85}
              showShadow={false}
              rating={4}
            />
          </Box>

          <TestimonialCard
            testimonial={testimonials[1]}
            showShadow={true}
            rating={5}
          />

          <Box display={{ base: "none", lg: "block" }}>
            <TestimonialCard
              testimonial={testimonials[2]}
              scale={0.85}
              showShadow={false}
              rating={4.5}
            />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default NBT;
