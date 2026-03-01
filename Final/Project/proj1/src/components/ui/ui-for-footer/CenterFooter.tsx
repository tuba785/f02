import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const CenterFooter = () => {
  const { t } = useTranslation();

  const booksCategories = [
    { key: "action", label: t("footer.categories.action") },
    { key: "adventure", label: t("footer.categories.adventure") },
    { key: "comedy", label: t("footer.categories.comedy") },
    { key: "crime", label: t("footer.categories.crime") },
    { key: "drama", label: t("footer.categories.drama") },
    { key: "fantasy", label: t("footer.categories.fantasy") },
    { key: "horror", label: t("footer.categories.horror") },
    { key: "view_more", label: t("footer.categories.view_more") },
  ];

  const quickLinks = [
    { key: "about_us", label: t("footer.links.about_us") },
    { key: "contact_us", label: t("footer.links.contact_us") },
    { key: "products", label: t("footer.links.products") },
    { key: "login", label: t("footer.links.login") },
    { key: "sign_up", label: t("footer.links.sign_up") },
    { key: "faq", label: t("footer.links.faq") },
    { key: "shipment", label: t("footer.links.shipment") },
  ];

  return (
    <HStack align="start" gap={12}>
      <VStack align="start" gap={3}>
        <Text fontSize="16px" fontWeight="700" color="text.strong" mb={1}>
          {t("footer.books_categories")}
        </Text>
        {booksCategories.map((category) => (
          <Link
            key={category.key}
            fontSize="14px"
            color="text.subtle"
            textDecoration="none"
            _hover={{
              color: "brand.purple",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {category.label}
          </Link>
        ))}
      </VStack>

      <VStack align="start" gap={3}>
        <Text fontSize="16px" fontWeight="700" color="text.strong" mb={1}>
          {t("footer.quick_links")}
        </Text>
        {quickLinks.map((link) => (
          <Link
            key={link.key}
            fontSize="14px"
            color="text.subtle"
            textDecoration="none"
            _hover={{
              color: "brand.purple",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {link.label}
          </Link>
        ))}
      </VStack>
    </HStack>
  );
};

export default CenterFooter;
