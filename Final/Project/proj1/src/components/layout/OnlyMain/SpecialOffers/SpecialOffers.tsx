import { Box, VStack, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";

import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import { colors } from "../../../../styles/colors";
import SpecialOffersCard from "./SpecialOffersCard";
import { useTranslation } from "react-i18next";

const SpecialOffers = () => {
  const { t } = useTranslation();
  const { books: allBooks, getBooks } = useBooks();
  const [books, setBooks] = useState<Book[]>([]);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);
  const [initialSlide, setInitialSlide] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (allBooks && allBooks.length > 0) {
      const discounted = allBooks.filter(
        (book) => book.discount !== null && book.discount > 0,
      );
      const selectedBooks = [...discounted]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 7);
      setBooks(selectedBooks);
      setInitialSlide(Math.floor(selectedBooks.length / 2));
    }
  }, [allBooks]);

  useEffect(() => {
    if (books.length > 0 && swiperRef.current) {
      const middleIndex = Math.floor(books.length / 2);
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.slideTo(middleIndex);
          handleSlideChange(swiperRef.current);
        }
      }, 100);
    }
  }, [books]);

  const handleSlideChange = (swiper: SwiperCore) => {
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <Box w="full" h="1100px" py={16} px={4} bg="bg.page">
      <VStack gap={8} maxW="1400px" mx="auto" h="full">
        <VStack gap={3} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="text.heading"
          >
            {t("special_offers.title")}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="text.muted">
            {t("special_offers.description")}
          </Text>
        </VStack>

        <Box w="full" flex={1} position="relative" overflow="hidden" px={2}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              handleSlideChange(swiper);
            }}
            style={{ height: "760px", overflow: "visible" }}
            slidesPerView={3}
            spaceBetween={40}
            centeredSlides={true}
            loop={false}
            initialSlide={initialSlide}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {books.map((book) => (
              <SwiperSlide
                key={book.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <SpecialOffersCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>

          <HStack
            position="absolute"
            bottom={70}
            left="50%"
            transform="translateX(-50%)"
            gap={4}
            zIndex={10}
          >
            {canSlidePrev && (
              <Button
                borderRadius="50%"
                w="50px"
                h="50px"
                bg={colors.primary.purple}
                color="text.onBrand"
                _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
                onClick={handlePrev}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaChevronLeft size={20} />
              </Button>
            )}
            {canSlideNext && (
              <Button
                borderRadius="50%"
                w="50px"
                h="50px"
                bg={colors.primary.purple}
                color="text.onBrand"
                _hover={{ bg: colors.primary.purple, opacity: 0.9 }}
                onClick={handleNext}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaChevronRight size={20} />
              </Button>
            )}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SpecialOffers;
