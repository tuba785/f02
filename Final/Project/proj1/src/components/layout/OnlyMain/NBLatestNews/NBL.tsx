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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NBL = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const articles: NewsArticle[] = [
    {
      id: 1,
      image: "https://picsum.photos/seed/newhpoto1/332/200",
      title: t("latest_news.articles.0.title"),
      description: t("latest_news.articles.0.description"),
      author: "Lidya Humble",
      authorAvatar: "us8",
      date: "2 days ago",
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/newhpoto2/332/200",
      title: t("latest_news.articles.1.title"),
      description: t("latest_news.articles.1.description"),
      author: "Steffanny William",
      authorAvatar: "us9",
      date: "5 August 2020",
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/newhpoto3/332/200",
      title: t("latest_news.articles.2.title"),
      description: t("latest_news.articles.2.description"),
      author: "James Wong",
      authorAvatar: "us10",
      date: "3 August 2020",
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/newhpoto4/332/200",
      title: t("latest_news.articles.3.title"),
      description: t("latest_news.articles.3.description"),
      author: "Franklin Junior",
      authorAvatar: "us11",
      date: "1 August 2020",
    },
  ];

  return (
    <Box py={16} px={4} bg="bg.page">
      <VStack gap={8} maxW="1400px" mx="auto">
        <HStack justify="space-between" w="full" align="flex-start">
          <VStack align="flex-start" gap={3} maxW="600px">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="text.heading"
            >
              {t("latest_news.title")}
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="text.muted">
              {t("latest_news.description")}
            </Text>
          </VStack>

          <Button
            bg={colors.primary.purple}
            color="text.onBrand"
            px={8}
            py={6}
            borderRadius="lg"
            _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
            fontSize="md"
            fontWeight="semibold"
            onClick={() => navigate("/news")}
          >
            <HStack gap={2}>
              <Text>{t("latest_news.view_more")}</Text>
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
