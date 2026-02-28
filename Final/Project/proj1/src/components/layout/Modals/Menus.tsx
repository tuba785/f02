import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PRIMARY_PURPLE, PRIMARY_LIGHT_PURPLE } from "../../../styles/colors";

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
  if (!isOpen) return null;

  return (
    <Box
      position="absolute"
      top="100%"
      left={0}
      mt={2}
      bg="white"
      border="1px solid #e8e8e8"
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
          bg={PRIMARY_PURPLE}
          color="white"
          borderRadius="10px"
          fontSize="14px"
          fontWeight="700"
          cursor="pointer"
          transition="opacity 0.15s"
          _hover={{ opacity: 0.85 }}
          mb={4}
        >
          View All Books
        </Flex>
      </Link>

      <Text fontSize="15px" fontWeight="700" color="#11142d" mb={3}>
        Browse by Genre
      </Text>

      <Grid templateColumns="1fr 1fr" gap={2}>
        {GENRES.map((genre) => (
          <Link key={genre} to={`/books?genre=${genre}`} onClick={onClose}>
            <Flex
              align="center"
              px={4}
              h="42px"
              borderRadius="10px"
              border="1.5px solid #e8e8e8"
              fontSize="14px"
              fontWeight="600"
              color="#11142d"
              cursor="pointer"
              transition="all 0.15s"
              _hover={{
                bg: PRIMARY_LIGHT_PURPLE,
                borderColor: PRIMARY_PURPLE,
                color: PRIMARY_PURPLE,
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
