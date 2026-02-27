import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { PRIMARY_PURPLE } from "../../styles/colors";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Flex
        flex={1}
        direction="column"
        align="center"
        justify="center"
        gap={4}
        py={20}
      >
        <Text
          fontSize="120px"
          fontWeight="900"
          color={PRIMARY_PURPLE}
          lineHeight={1}
          letterSpacing="-4px"
        >
          404
        </Text>

        <Text fontSize="28px" fontWeight="700" color="#1a202c">
          Page Not Found
        </Text>

        <Text fontSize="15px" color="#9ca3af" maxW="380px" textAlign="center">
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <Box mt={4}>
          <Button
            bg={PRIMARY_PURPLE}
            color="white"
            px={8}
            py={6}
            fontSize="15px"
            fontWeight="600"
            borderRadius="10px"
            _hover={{ opacity: 0.85 }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default NotFoundPage;
