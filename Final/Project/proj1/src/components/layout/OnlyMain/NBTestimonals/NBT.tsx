import { Box, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import { colors } from "../../../../styles/colors";
import { TestimonialCard } from "./NBT2";
import type { Testimonial } from "./NBT2";
import NBT3 from "./NBT3";

const NBT = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "I never know this shop before, until my grandma and how excelent this book store",
      name: "Miranda Lee",
      role: "Book Lovers",
      image: "https://picsum.photos/seed/us1/50/50",
    },
    {
      id: 2,
      text: "Shoping book in Bookee is very easy. Quick delivery and fast respon. They service is awesome!",
      name: "Steve Henry",
      role: "Book Lovers",
      image: "https://picsum.photos/seed/us2/50/50",
    },
    {
      id: 3,
      text: "Amazing service and great selection of books. Highly recommend to everyone!",
      name: "John Smith",
      role: "Book Lovers",
      image: "https://picsum.photos/seed/us3/50/50",
    },
  ];

  return (
    <Box py={16} px={4} bg="white" h="750px">
      <VStack gap={8} maxW="1400px" mx="auto" h="full">
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="gray.800"
          >
            Testimonials
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.500"
            maxW="600px"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore ut aliqua
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
            <Text color="white" fontSize="xs" fontWeight="bold">
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
