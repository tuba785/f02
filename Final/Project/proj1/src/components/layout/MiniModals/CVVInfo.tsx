import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CVVInfo = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <Box
      position="relative"
      display="inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      cursor="pointer"
    >
      <FaInfoCircle size={16} color="var(--chakra-colors-text-placeholder)" />

      {show && (
        <Box
          position="absolute"
          bottom="calc(100% + 8px)"
          right={0}
          bg="bg.tooltip"
          color="text.onBrand"
          borderRadius="8px"
          px={4}
          py={3}
          w="220px"
          boxShadow="0 4px 14px rgba(0,0,0,0.15)"
          zIndex={20}
        >
          <Text fontSize="12px" fontWeight="600" mb={1}>
            {t("cvv_info.title")}
          </Text>
          <Text fontSize="11px" lineHeight="1.5" color="text.muted">
            {t("cvv_info.description")}
          </Text>
          <Box
            position="absolute"
            bottom="-6px"
            right="6px"
            w={0}
            h={0}
            borderLeft="6px solid transparent"
            borderRight="6px solid transparent"
            borderTop="6px solid"
            borderTopColor="bg.tooltip"
          />
        </Box>
      )}
    </Box>
  );
};

export default CVVInfo;
