import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import "swiper/css";
import "swiper/css/navigation";
import { useColorMode } from "../../../ui/color-mode";
import { useTranslation } from "react-i18next";

const BOOK_COVER_WIDTH = 140;
const BOOK_COVER_HEIGHT = 200;

const formatPrice = (value: number) => value.toFixed(2);

export const BannerContent3 = () => {
  const { t } = useTranslation();
  const { books, loading, getBooks } = useBooks();
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const { colorMode } = useColorMode();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (books.length === 0 && loading === "idle") {
      getBooks();
    }
  }, [books.length, loading, getBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setTopBooks(books.slice(0, 10));
    }
  }, [books]);

  return (
    <Box
      width="795px"
      height="445px"
      position="relative"
      mx="auto"
      backgroundImage={
        colorMode === "dark"
          ? "none"
          : `url('src/assets/banners/home-banner3.png')`
      }
      backgroundColor={colorMode === "dark" ? "bg.surface" : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="14px"
      padding="28px 32px"
    >
      <Flex
        direction="column"
        gap="8px"
        maxW="520px"
        paddingLeft="32px"
        paddingBottom="10px"
      >
        <Text fontSize="28px" fontWeight="700" color="text.heading">
          {t("banner3.title")}
        </Text>
        <Text fontSize="14px" color="text.secondary" lineHeight="1.6">
          {t("banner3.description")}
        </Text>
      </Flex>

      <Box position="relative" mt="22px">
        <IconButton
          aria-label="Previous"
          position="absolute"
          left="8px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          width="42px"
          height="42px"
          borderRadius="999px"
          backgroundColor="bg.surface"
          boxShadow="0 8px 20px rgba(0, 0, 0, 0.12)"
          color="text.inverse"
          _hover={{ backgroundColor: "hover.arrow" }}
          className="banner3-prev"
          opacity={isAtStart ? 0 : 1}
          visibility={isAtStart ? "hidden" : "visible"}
          pointerEvents={isAtStart ? "none" : "auto"}
        >
          <HiArrowLeft size={20} />
        </IconButton>
        <IconButton
          aria-label="Next"
          position="absolute"
          right="8px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          width="42px"
          height="42px"
          borderRadius="999px"
          backgroundColor="bg.surface"
          boxShadow="0 8px 20px rgba(0, 0, 0, 0.12)"
          color="text.inverse"
          _hover={{ backgroundColor: "hover.arrow" }}
          className="banner3-next"
          opacity={isAtEnd ? 0 : 1}
          visibility={isAtEnd ? "hidden" : "visible"}
          pointerEvents={isAtEnd ? "none" : "auto"}
        >
          <HiArrowRight size={20} />
        </IconButton>

        <Swiper
          key={topBooks.length}
          modules={[Navigation]}
          navigation={{
            prevEl: ".banner3-prev",
            nextEl: ".banner3-next",
          }}
          slidesPerView={4}
          spaceBetween={18}
          loop={false}
          onSwiper={(swiper) => {
            setIsAtStart(swiper.isBeginning);
            setIsAtEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsAtStart(swiper.isBeginning);
            setIsAtEnd(swiper.isEnd);
          }}
          onReachBeginning={(swiper) => setIsAtStart(swiper.isBeginning)}
          onReachEnd={(swiper) => setIsAtEnd(swiper.isEnd)}
          onFromEdge={(swiper) => {
            setIsAtStart(swiper.isBeginning);
            setIsAtEnd(swiper.isEnd);
          }}
        >
          {topBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <Link to={`/books/${book.id}`}>
                <VStack align="start" gap={2} width={`${BOOK_COVER_WIDTH}px`}>
                  <Box
                    width={`${BOOK_COVER_WIDTH}px`}
                    height={`${BOOK_COVER_HEIGHT}px`}
                    borderRadius="12px"
                    overflow="hidden"
                    backgroundColor="status.inactive"
                    boxShadow="inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
                    cursor="pointer"
                  >
                    <Image
                      src={`${book.cover}/${BOOK_COVER_WIDTH}/${BOOK_COVER_HEIGHT}`}
                      alt={book.title}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>

                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="text.strong"
                    lineHeight="1.3"
                    css={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {book.title}
                  </Text>

                  <Text
                    fontSize="xs"
                    color="text.secondary"
                    lineHeight="1.3"
                    css={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {book.author}
                  </Text>

                  <HStack gap={2} align="baseline">
                    <Text fontSize="sm" fontWeight="700" color="text.strong">
                      $ {formatPrice(book.discounted_price)}
                    </Text>
                    {book.discount !== null && book.discount > 0 && (
                      <Text
                        fontSize="xs"
                        color="text.placeholder"
                        textDecoration="line-through"
                      >
                        $ {formatPrice(book.price)}
                      </Text>
                    )}
                  </HStack>
                </VStack>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
