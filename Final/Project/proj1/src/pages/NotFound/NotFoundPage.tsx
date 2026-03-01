import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
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
          color="brand.purple"
          lineHeight={1}
          letterSpacing="-4px"
        >
          404
        </Text>

        <Text fontSize="28px" fontWeight="700" color="text.heading">
          {t("not_found.title")}
        </Text>

        <Text
          fontSize="15px"
          color="text.placeholder"
          maxW="380px"
          textAlign="center"
        >
          {t("not_found.description")}
        </Text>

        <Box mt={4}>
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
            {t("not_found.back_to_home")}
          </Button>
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default NotFoundPage;
