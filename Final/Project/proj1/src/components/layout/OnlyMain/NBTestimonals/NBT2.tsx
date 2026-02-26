import { Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { colors } from "../../../../styles/colors";

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  scale?: number;
  opacity?: number;
  showShadow?: boolean;
  rating?: number;
}

export const TestimonialCard = ({
  testimonial,
  scale = 1,
  opacity = 1,
  showShadow = true,
  rating = 5,
}: TestimonialCardProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} size={20} color={colors.primary.orange} />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" size={20} color={colors.primary.orange} />,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} size={20} color="#D1D5DB" />);
    }

    return stars;
  };

  return (
    <Box
      maxW="500px"
      w="full"
      bg="white"
      p={8}
      borderRadius="2xl"
      boxShadow={showShadow ? "0 25px 70px rgba(0, 0, 0, 0.2)" : "none"}
      position="relative"
      transform={`scale(${scale})`}
      opacity={opacity}
      transition="all 0.3s"
    >
      <VStack gap={6} align="stretch">
        <Text
          fontSize={{ base: "md", md: "lg" }}
          textAlign="center"
          color="gray.700"
          lineHeight="tall"
        >
          {testimonial.text}
        </Text>

        <HStack justify="space-between" align="center">
          <HStack gap={3} align="center">
            <Box
              w="60px"
              h="60px"
              bg="gray.300"
              borderRadius="full"
              overflow="hidden"
              flexShrink={0}
            >
              {testimonial.image && (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              )}
            </Box>

            <VStack gap={0} align="flex-start">
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                {testimonial.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {testimonial.role}
              </Text>
            </VStack>
          </HStack>

          <HStack gap={1}>{renderStars()}</HStack>
        </HStack>
      </VStack>
    </Box>
  );
};
