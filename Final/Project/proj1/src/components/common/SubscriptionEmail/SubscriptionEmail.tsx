import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import bannerImage from "../../../assets/banners/email-banner.png";
import { useTranslation } from "react-i18next";

const SubscriptionEmail = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribed with email:", email);
      setEmail("");
    }
  };

  return (
    <Center w="100%" py={10}>
      <Box
        w="100%"
        maxW="1620px"
        h="300px"
        backgroundImage={`url(${bannerImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="24px"
        overflow="hidden"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 10px 30px rgba(0, 0, 0, 0.15)"
      >
        <VStack
          gap={6}
          position="relative"
          zIndex={2}
          align="center"
          textAlign="center"
          px={10}
          w="100%"
        >
          <Heading
            as="h2"
            maxW="35%"
            fontSize="30px"
            color="white"
            fontWeight={600}
            lineHeight={1.3}
          >
            {t("subscription.title")}
          </Heading>

          <HStack gap={0} w="100%" maxW="450px" mx="auto">
            <Input
              type="email"
              placeholder={t("subscription.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="rgba(255, 255, 255, 0.25)"
              color="white"
              borderRadius="8px 0 0 8px"
              border="none"
              _placeholder={{ color: "rgba(255, 255, 255, 0.8)" }}
              _focus={{
                bg: "rgba(255, 255, 255, 0.35)",
                boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.1)",
                outline: "none",
              }}
              fontSize="14px"
              fontFamily="inherit"
            />
            <Button
              onClick={handleSubscribe}
              bg="bg.surface"
              color="text.heading"
              fontWeight={700}
              fontSize="14px"
              px={7}
              py={3}
              borderRadius="0 8px 8px 0"
              whiteSpace="nowrap"
              _hover={{
                bg: "hover.surface",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.3s ease"
            >
              {t("subscription.button")}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SubscriptionEmail;
