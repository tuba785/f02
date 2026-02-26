import { Box, VStack, HStack, Text, Heading, Image } from "@chakra-ui/react";
import { colors } from "../../../../styles/colors";
import NBT3 from "../NBTestimonals/NBT3";

export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <VStack align="stretch" gap={4} bg="white" borderRadius="lg">
      <Box w="full" h="200px" bg="gray.300" borderRadius="lg" overflow="hidden">
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            w="full"
            h="full"
            objectFit="cover"
          />
        )}
      </Box>

      <VStack align="stretch" gap={3}>
        <Heading
          as="h3"
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          lineHeight="tall"
        >
          {article.title}
        </Heading>

        <Text fontSize="sm" color="gray.500" lineHeight="tall">
          {article.description}
        </Text>

        <Text
          fontSize="sm"
          color={colors.primary.purple}
          fontWeight="semibold"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          Continue reading
        </Text>

        <HStack gap={3} align="center">
          <NBT3 seed={article.authorAvatar} />
          <VStack align="flex-start" gap={0}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
              {article.author}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {article.date}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
