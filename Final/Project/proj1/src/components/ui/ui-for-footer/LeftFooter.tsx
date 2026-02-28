import { Box, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LeftFooter = () => {
  return (
    <VStack align="start" gap={4} maxW="360px">
      <HStack gap={3}>
        <Link to="/">
          <Image
            src="/bookoe-logo-main.svg"
            alt="Bookoe logo"
            h="44px"
            cursor="pointer"
          />
        </Link>
      </HStack>

      <Text fontSize="14px" color="gray.600" lineHeight="1.6">
        Bookoe is a Book Store Website lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud
      </Text>

      <Box>
        <Text fontSize="14px" fontWeight="600" color="gray.800" mb={3}>
          Follow Us
        </Text>
        <HStack gap={2}>
          <IconButton
            aria-label="Facebook"
            size="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            color="#3b5998"
            _hover={{ bg: "#e8eaf6", borderColor: "#3b5998" }}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            aria-label="YouTube"
            size="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            color="#FF0000"
            _hover={{ bg: "#ffebee", borderColor: "#FF0000" }}
          >
            <FaYoutube />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            size="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            color="#1DA1F2"
            _hover={{ bg: "#e3f2fd", borderColor: "#1DA1F2" }}
          >
            <FaTwitter />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            size="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            color="#0077B5"
            _hover={{ bg: "#e1f5fe", borderColor: "#0077B5" }}
          >
            <FaLinkedinIn />
          </IconButton>
          <IconButton
            aria-label="Instagram"
            size="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            color="#E1306C"
            _hover={{ bg: "#fce4ec", borderColor: "#E1306C" }}
          >
            <FaInstagram />
          </IconButton>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LeftFooter;
