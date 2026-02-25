import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const CenterFooter = () => {
  const booksCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "View more",
  ];

  const quickLinks = [
    "About us",
    "Contact us",
    "Products",
    "Login",
    "Sign Up",
    "FAQ",
    "Shipment",
  ];

  return (
    <HStack align="start" gap={12}>
      <VStack align="start" gap={3}>
        <Text fontSize="16px" fontWeight="700" color="gray.800" mb={1}>
          Books Categories
        </Text>
        {booksCategories.map((category) => (
          <Link
            key={category}
            fontSize="14px"
            color="gray.600"
            textDecoration="none"
            _hover={{
              color: PRIMARY_PURPLE,
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {category}
          </Link>
        ))}
      </VStack>

      <VStack align="start" gap={3}>
        <Text fontSize="16px" fontWeight="700" color="gray.800" mb={1}>
          Quick Links
        </Text>
        {quickLinks.map((link) => (
          <Link
            key={link}
            fontSize="14px"
            color="gray.600"
            textDecoration="none"
            _hover={{
              color: PRIMARY_PURPLE,
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {link}
          </Link>
        ))}
      </VStack>
    </HStack>
  );
};

export default CenterFooter;
