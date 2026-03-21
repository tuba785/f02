import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import NBT3 from "../OnlyMain/NBTestimonals/NBT3";

const NEWS_IMAGES = [
  "https://picsum.photos/seed/newhpoto1/600/400",
  "https://picsum.photos/seed/newhpoto2/600/400",
  "https://picsum.photos/seed/newhpoto3/600/400",
  "https://picsum.photos/seed/newhpoto4/600/400",
];

interface NewsItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  author: string;
  authorAvatar: string;
  date: string;
  image: string;
}

const NewsComp = () => {
  const { t } = useTranslation();

  const articles: NewsItem[] = [
    {
      id: 1,
      title: t("latest_news.articles.0.title"),
      description: t("latest_news.articles.0.description"),
      fullDescription:
        t("latest_news.articles.0.full_description") ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "Lidya Humble",
      authorAvatar: "us8",
      date: "2 days ago",
      image: NEWS_IMAGES[0],
    },
    {
      id: 2,
      title: t("latest_news.articles.1.title"),
      description: t("latest_news.articles.1.description"),
      fullDescription:
        t("latest_news.articles.1.full_description") ||
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      author: "Steffanny William",
      authorAvatar: "us9",
      date: "5 August 2020",
      image: NEWS_IMAGES[1],
    },
    {
      id: 3,
      title: t("latest_news.articles.2.title"),
      description: t("latest_news.articles.2.description"),
      fullDescription:
        t("latest_news.articles.2.full_description") ||
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut quid ex ea commodi consequatur.",
      author: "James Wong",
      authorAvatar: "us10",
      date: "3 August 2020",
      image: NEWS_IMAGES[2],
    },
    {
      id: 4,
      title: t("latest_news.articles.3.title"),
      description: t("latest_news.articles.3.description"),
      fullDescription:
        t("latest_news.articles.3.full_description") ||
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      author: "Franklin Junior",
      authorAvatar: "us11",
      date: "1 August 2020",
      image: NEWS_IMAGES[3],
    },
  ];

  return (
    <Flex
      w="100%"
      justify="center"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
      bg="bg.page"
    >
      <Box w="100%" maxW="1100px">
        <VStack align="stretch" gap={0} mb={10}>
          <Heading fontSize="36px" fontWeight="800" color="text.heading" mb={2}>
            {t("latest_news.title")}
          </Heading>
          <Text fontSize="16px" color="text.secondary" maxW="600px">
            {t("latest_news.description")}
          </Text>
        </VStack>

        <VStack gap={10} align="stretch">
          {articles.map((article, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <Flex
                key={article.id}
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
                  h={{ base: "280px", md: "auto" }}
                  minH={{ md: "380px" }}
                  overflow="hidden"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
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
                  justify="space-between"
                  p={{ base: 6, md: 10 }}
                  gap={4}
                >
                  <VStack align="stretch" gap={4}>
                    <Heading
                      fontSize={{ base: "26px", md: "32px" }}
                      fontWeight="700"
                      color="text.heading"
                      lineHeight="1.2"
                    >
                      {article.title}
                    </Heading>

                    <Text
                      fontSize="15px"
                      color="text.secondary"
                      lineHeight="1.8"
                      fontWeight="500"
                    >
                      {article.fullDescription}
                    </Text>
                  </VStack>

                  <VStack align="stretch" gap={4}>
                    <HStack gap={3} align="center">
                      <NBT3 seed={article.authorAvatar} />
                      <VStack align="flex-start" gap={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="text.strong"
                        >
                          {article.author}
                        </Text>
                        <Text fontSize="xs" color="text.muted">
                          {article.date}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

export default NewsComp;
