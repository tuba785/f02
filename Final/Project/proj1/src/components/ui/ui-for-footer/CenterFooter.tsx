import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GENRES = [
  { genre: "Biography", key: "biography" },
  { genre: "Fantasy", key: "fantasy" },
  { genre: "Historical", key: "historical" },
  { genre: "Horror", key: "horror" },
  { genre: "Mystery", key: "mystery" },
  { genre: "Romance", key: "romance" },
  { genre: "Sci-Fi", key: "sci_fi" },
  { genre: "Self-help", key: "self_help" },
  { genre: "Thriller", key: "thriller" },
  { genre: "Young-adult", key: "young_adult" },
];

const QUICK_LINKS = [
  { key: "books", path: "/books" },
  { key: "login", path: "/login" },
  { key: "sign_up", path: "/register" },
  { key: "promos", path: "/promos" },
  { key: "news", path: "/news" },
  { key: "about_us", path: "/about" },
  { key: "terms", path: "/terms" },
];

const linkStyle = {
  fontSize: "16px",
  color: "text.subtle",
  textDecoration: "none",
  transition: "color 0.15s",
  _hover: {
    color: "brand.purple",
    textDecoration: "none",
  },
};

const CenterFooter = () => {
  const { t } = useTranslation();

  return (
    <HStack align="start" gap={12}>
      <Box>
        <Text fontSize="16px" fontWeight="700" color="text.strong" mb={3}>
          {t("footer.books_categories")}
        </Text>
        <Grid templateColumns="1fr 1fr" columnGap={8} rowGap={3}>
          {GENRES.map(({ genre, key }) => (
            <Link key={key} to={`/books?genre=${genre}`}>
              <Text {...linkStyle}>{t(`footer.categories.${key}`)}</Text>
            </Link>
          ))}
        </Grid>
      </Box>

      <VStack align="start" gap={3}>
        <Text fontSize="16px" fontWeight="700" color="text.strong" mb={1}>
          {t("footer.quick_links")}
        </Text>
        {QUICK_LINKS.map(({ key, path }) => (
          <Link key={key} to={path}>
            <Text {...linkStyle}>{t(`footer.links.${key}`)}</Text>
          </Link>
        ))}
      </VStack>
    </HStack>
  );
};

export default CenterFooter;
