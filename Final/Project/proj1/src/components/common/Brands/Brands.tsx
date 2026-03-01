import { Box, Flex, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import logo1 from "../../../assets/brand-logos/b-logo1.svg";
import logo2 from "../../../assets/brand-logos/b-logo2.svg";
import logo3 from "../../../assets/brand-logos/b-logo3.svg";
import logo4 from "../../../assets/brand-logos/b-logo4.svg";
import logo5 from "../../../assets/brand-logos/b-logo5.svg";
import logo6 from "../../../assets/brand-logos/b-logo6.svg";
import logo7 from "../../../assets/brand-logos/b-logo7.svg";

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Brands = () => {
  const brands = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <Box w="100%" py={12} bg="bg.page" overflow="hidden">
      <Flex
        gap={16}
        alignItems="center"
        animation={`${scroll} 25s linear infinite`}
        w="max-content"
      >
        {brands.map((logo, index) => (
          <Box
            key={`first-${index}`}
            h="80px"
            minW="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            <Image
              src={logo}
              alt={`Brand logo ${index + 1}`}
              maxH="100%"
              maxW="180px"
              objectFit="contain"
            />
          </Box>
        ))}
        {brands.map((logo, index) => (
          <Box
            key={`second-${index}`}
            h="80px"
            minW="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            <Image
              src={logo}
              alt={`Brand logo ${index + 1}`}
              maxH="100%"
              maxW="180px"
              objectFit="contain"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Brands;
