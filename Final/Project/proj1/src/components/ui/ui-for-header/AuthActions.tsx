import { Box, Button, HStack } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <HStack gap={3}>
      <Button
        variant="ghost"
        color="brand.purple"
        h="44px"
        px="16px"
        bg="brand.lightPurple"
        borderRadius="14px"
        fontWeight="600"
        _hover={{ opacity: 0.8 }}
        onClick={() => navigate("/login")}
      >
        {t("header.log_in")}
      </Button>
      <Button
        display="flex"
        alignItems="center"
        gap={2}
        bg="brand.purple"
        color="text.onBrand"
        h="44px"
        px="18px"
        borderRadius="14px"
        _hover={{ opacity: 0.85 }}
        onClick={() => navigate("/register")}
      >
        <FiUser />
        <Box as="span">{t("header.sign_up")}</Box>
      </Button>
    </HStack>
  );
};

export default AuthActions;
