import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HiArrowRight } from "react-icons/hi";
import { useColorMode } from "../../../ui/color-mode";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Slide {
  title: string;
  subtitle: string;
  discount: string;
  badge: string;
  description: string;
}

const slides: Slide[] = [
  {
    title: "Special 50% Off",
    subtitle: "for our student community",
    discount: "50%",
    badge: "BACK TO SCHOOL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    title: "Extra 40% Off",
    subtitle: "for our elder community",
    discount: "40%",
    badge: "SENIOR SPECIAL",
    description:
      "Exclusive offer for our valued seniors. Enjoy premium products and services with special senior discounts. Experience quality and comfort with our dedicated senior-friendly options.",
  },
  {
    title: "Amazing 45% Off",
    subtitle: "for kids and families",
    discount: "45%",
    badge: "KIDS SPECIAL",
    description:
      "Make your kids happy! Special discounts on educational toys, games, and children products. Safe, fun, and affordable options for your little ones and family enjoyment.",
  },
  {
    title: "Bundle Deal 55% Off",
    subtitle: "buy more save more",
    discount: "55%",
    badge: "FAMILY BUNDLE",
    description:
      "Perfect for family shopping! Get amazing discounts when you bundle your purchases. Mix and match products from different categories and save even more on your total purchase.",
  },
];

interface BannerContent1Props {
  width?: string;
  height?: string;
}

export const BannerContent1 = ({
  width = "1220px",
  height = "662px",
}: BannerContent1Props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  const { t } = useTranslation();

  const translatedSlides = slides.map((slide, i) => ({
    ...slide,
    title: t(`banner1.slides.${i}.title`),
    subtitle: t(`banner1.slides.${i}.subtitle`),
    badge: t(`banner1.slides.${i}.badge`),
    description: t(`banner1.slides.${i}.description`),
  }));

  return (
    <Box
      width={width}
      height={height}
      position="relative"
      mx="auto"
      backgroundImage={
        isDark ? "none" : `url('src/assets/banners/home-banner1.png')`
      }
      backgroundColor={isDark ? "bg.surface" : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="8px"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(255, 255, 255, 0.08)"
        zIndex={0}
      />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          dynamicBullets: false,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {translatedSlides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "100px",
            }}
          >
            <Flex
              flexDirection="column"
              justifyContent="flex-start"
              width="45%"
              gap="30px"
            >
              <Text
                fontSize="16px"
                fontWeight="700"
                color="brand.purple"
                letterSpacing="2px"
                textTransform="uppercase"
              >
                {slide.badge}
              </Text>

              <Text
                fontSize="60px"
                fontWeight="700"
                color="text.heading"
                lineHeight="1.2"
              >
                {slide.title}
              </Text>

              <Text
                fontSize="32px"
                fontWeight="600"
                color="text.heading"
                lineHeight="1.4"
              >
                {slide.subtitle}
              </Text>

              <Text
                fontSize="16px"
                color="text.secondary"
                lineHeight="1.6"
                maxWidth="420px"
                marginY="16px"
              >
                {slide.description}
              </Text>

              <Flex gap="16px" alignItems="center" marginTop="16px">
                <Button
                  backgroundColor="brand.purple"
                  color="text.onBrand"
                  height="48px"
                  paddingX="32px"
                  paddingY="12px"
                  borderRadius="8px"
                  fontSize="16px"
                  fontWeight="600"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  _hover={{
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.3s ease"
                  onClick={() => navigate("/purchase")}
                >
                  {t("banner1.get_the_deal")}
                  <HiArrowRight size={20} />
                </Button>

                <Button
                  backgroundColor="transparent"
                  color="text.heading"
                  height="48px"
                  paddingX="32px"
                  paddingY="12px"
                  borderRadius="8px"
                  fontSize="16px"
                  fontWeight="600"
                  border="2px solid"
                  borderColor="border.input"
                  cursor="pointer"
                  _hover={{
                    borderColor: "brand.purple",
                    color: "brand.purple",
                  }}
                  transition="all 0.3s ease"
                  onClick={() => navigate("/promos")}
                >
                  {t("banner1.see_other_promos")}
                </Button>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box className="swiper-pagination" />
    </Box>
  );
};
