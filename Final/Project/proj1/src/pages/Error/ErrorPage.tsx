import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let status = "500";
  let message = "Something went wrong on our end. Please try again later.";

  if (isRouteErrorResponse(error)) {
    status = String(error.status);
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

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
          color="brand.orange"
          lineHeight={1}
          letterSpacing="-4px"
        >
          {status}
        </Text>

        <Text fontSize="28px" fontWeight="700" color="text.heading">
          An Error Occurred
        </Text>

        <Text
          fontSize="15px"
          color="text.placeholder"
          maxW="420px"
          textAlign="center"
        >
          {message}
        </Text>

        <Box mt={4} display="flex" gap={3}>
          <Button
            bg="brand.purple"
            color="text.onBrand"
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
          <Button
            bg="transparent"
            color="text.heading"
            border="2px solid"
            borderColor="border.input"
            px={8}
            py={6}
            fontSize="15px"
            fontWeight="600"
            borderRadius="10px"
            _hover={{ borderColor: "brand.purple", color: "brand.purple" }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default ErrorPage;
