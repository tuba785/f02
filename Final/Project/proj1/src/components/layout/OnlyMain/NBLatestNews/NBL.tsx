import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Grid,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { colors } from "../../../../styles/colors";
import { NewsCard } from "./NBL2";
import type { NewsArticle } from "./NBL2";

const NBL = () => {
  const articles: NewsArticle[] = [
    {
      id: 1,
      image: "https://picsum.photos/seed/newhpoto1/332/200",
      title: "Why reading is important for our children?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "Lidya Humble",
      authorAvatar: "us8",
      date: "2 days ago",
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/newhpoto2/332/200",
      title: "Benefits of reading: Smart, Diligent, Happy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "Steffanny William",
      authorAvatar: "us9",
      date: "5 August 2020",
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/newhpoto3/332/200",
      title: "What books you should read in 2020?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "James Wong",
      authorAvatar: "us10",
      date: "3 August 2020",
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/newhpoto4/332/200",
      title: "10 Things you must know to improve your reading skills",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...",
      author: "Franklin Junior",
      authorAvatar: "us11",
      date: "1 August 2020",
    },
  ];

  return (
    <Box py={16} px={4} bg="white">
      <VStack gap={8} maxW="1400px" mx="auto">
        <HStack justify="space-between" w="full" align="flex-start">
          <VStack align="flex-start" gap={3} maxW="600px">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="gray.800"
            >
              Letest News
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Text>
          </VStack>

          <Button
            bg={colors.primary.purple}
            color="white"
            px={8}
            py={6}
            borderRadius="lg"
            _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
            fontSize="md"
            fontWeight="semibold"
          >
            <HStack gap={2}>
              <Text>View more</Text>
              <FaArrowRight />
            </HStack>
          </Button>
        </HStack>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          w="full"
        >
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default NBL;
