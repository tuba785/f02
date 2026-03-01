import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GENRES = [
  "Biography",
  "Fantasy",
  "Historical",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Self-help",
  "Thriller",
  "Young-adult",
];

interface MenusProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menus = ({ isOpen, onClose }: MenusProps) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <Box
      position="absolute"
      top="100%"
      left={0}
      mt={2}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="16px"
      boxShadow="0 8px 32px rgba(0,0,0,0.12)"
      p={5}
      zIndex={20}
      w="420px"
    >
      <Link to="/books" onClick={onClose} style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          justify="center"
          h="44px"
          bg="brand.purple"
          color="text.onBrand"
          borderRadius="10px"
          fontSize="14px"
          fontWeight="700"
          cursor="pointer"
          transition="opacity 0.15s"
          _hover={{ opacity: 0.85 }}
          mb={4}
        >
          {t("menus.view_all_books")}
        </Flex>
      </Link>

      <Text fontSize="15px" fontWeight="700" color="text.primary" mb={3}>
        {t("menus.browse_by_genre")}
      </Text>

      <Grid templateColumns="1fr 1fr" gap={2}>
        {GENRES.map((genre) => (
          <Link key={genre} to={`/books?genre=${genre}`} onClick={onClose}>
            <Flex
              align="center"
              px={4}
              h="42px"
              borderRadius="10px"
              border="1.5px solid"
              borderColor="border.default"
              fontSize="14px"
              fontWeight="600"
              color="text.primary"
              cursor="pointer"
              transition="all 0.15s"
              _hover={{
                bg: "brand.lightPurple",
                borderColor: "brand.purple",
                color: "brand.purple",
              }}
            >
              {genre}
            </Flex>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Menus;
