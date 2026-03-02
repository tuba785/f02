import { Box, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useColorMode } from "../color-mode";
import { useTranslation } from "react-i18next";

const LeftFooter = () => {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <VStack align="start" gap={4} maxW="360px">
      <HStack gap={3}>
        <Link to="/">
          <Image
            src={
              colorMode === "dark"
                ? "/bookoe-logo-dark.svg"
                : "/bookoe-logo-main.svg"
            }
            alt="Bookoe logo"
            h="44px"
            cursor="pointer"
          />
        </Link>
      </HStack>

      <Text fontSize="14px" color="text.subtle" lineHeight="1.6">
        {t("footer.description")}
      </Text>

      <Box>
        <Text fontSize="14px" fontWeight="600" color="text.strong" mb={3}>
          rc {t("footer.follow_us")}
        </Text>
        <HStack gap={2}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="Facebook"
              size="md"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.header"
              borderRadius="8px"
              color="#3b5998"
              _hover={{ bg: "#e8eaf6", borderColor: "#3b5998" }}
            >
              <FaFacebookF />
            </IconButton>
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="YouTube"
              size="md"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.header"
              borderRadius="8px"
              color="#FF0000"
              _hover={{ bg: "#ffebee", borderColor: "#FF0000" }}
            >
              <FaYoutube />
            </IconButton>
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <IconButton
              aria-label="X (Twitter)"
              size="md"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.header"
              borderRadius="8px"
              color="#1DA1F2"
              _hover={{ bg: "#e3f2fd", borderColor: "#1DA1F2" }}
            >
              <FaTwitter />
            </IconButton>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="LinkedIn"
              size="md"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.header"
              borderRadius="8px"
              color="#0077B5"
              _hover={{ bg: "#e1f5fe", borderColor: "#0077B5" }}
            >
              <FaLinkedinIn />
            </IconButton>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="Instagram"
              size="md"
              bg="bg.surface"
              border="1px solid"
              borderColor="border.header"
              borderRadius="8px"
              color="#E1306C"
              _hover={{ bg: "#fce4ec", borderColor: "#E1306C" }}
            >
              <FaInstagram />
            </IconButton>
          </a>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LeftFooter;
