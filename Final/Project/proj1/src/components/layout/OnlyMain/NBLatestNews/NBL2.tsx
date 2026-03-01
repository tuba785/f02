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
    <VStack align="stretch" gap={4} bg="bg.surface" borderRadius="lg">
      <Box
        w="full"
        h="200px"
        bg="bg.skeleton"
        borderRadius="lg"
        overflow="hidden"
      >
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
          color="text.heading"
          lineHeight="tall"
        >
          {article.title}
        </Heading>

        <Text fontSize="sm" color="text.muted" lineHeight="tall">
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
            <Text fontSize="sm" fontWeight="semibold" color="text.strong">
              {article.author}
            </Text>
            <Text fontSize="xs" color="text.muted">
              {article.date}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
