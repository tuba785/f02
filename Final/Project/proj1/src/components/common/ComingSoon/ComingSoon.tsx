import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
  const { t } = useTranslation();
  return (
    <Flex direction="column" align="center" justify="center" py={16} gap={2}>
      <Text
        fontSize="48px"
        fontWeight="800"
        color="brand.purple"
        letterSpacing="-1px"
      >
        {t("coming_soon.title")}
      </Text>
      <Text fontSize="15px" color="text.placeholder">
        {t("coming_soon.description")}
      </Text>
    </Flex>
  );
};

export default ComingSoon;
