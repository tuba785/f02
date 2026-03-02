import { Box, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface TermsInfoProps {
  show: boolean;
  onClose: () => void;
}

const TermsInfo = ({ show, onClose }: TermsInfoProps) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <Box position="relative" display="inline-flex">
      <Box
        onClick={onClose}
        cursor="pointer"
        display="flex"
        alignItems="center"
      >
        <FiAlertCircle size={16} color="var(--chakra-colors-status-error)" />
      </Box>

      <Box
        position="absolute"
        bottom="calc(100% + 8px)"
        left="50%"
        transform="translateX(-50%)"
        bg="bg.tooltip"
        color="text.onBrand"
        borderRadius="8px"
        px={4}
        py={3}
        w="260px"
        boxShadow="0 4px 14px rgba(0,0,0,0.15)"
        zIndex={20}
      >
        <Text fontSize="12px" fontWeight="600" mb={1}>
          {t("terms_info.title")}
        </Text>
        <Text fontSize="11px" lineHeight="1.5" color="text.muted">
          {t("terms_info.description")}{" "}
          <Link to="/terms">
            <Text
              as="span"
              color="brand.purple"
              fontWeight="600"
              _hover={{ textDecoration: "underline" }}
            >
              {t("terms_info.link")}
            </Text>
          </Link>
        </Text>
        <Box
          position="absolute"
          bottom="-6px"
          left="50%"
          transform="translateX(-50%)"
          w={0}
          h={0}
          borderLeft="6px solid transparent"
          borderRight="6px solid transparent"
          borderTop="6px solid"
          borderTopColor="bg.tooltip"
        />
      </Box>
    </Box>
  );
};

export default TermsInfo;
