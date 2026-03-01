import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Book } from "../../../../types/book";
import { useBooks } from "../../../../hooks/useBooks";

import "swiper/css";
import "swiper/css/navigation";

const MiniSliderInBanner = () => {
  const { books: allBooks, getBooks } = useBooks();
  const [books, setBooks] = useState<Book[]>([]);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (allBooks && allBooks.length > 0) {
      const bestsellersWithDiscount = allBooks.filter(
        (book) =>
          book.is_bestseller && book.discount !== null && book.discount > 0,
      );

      const selectedCount = Math.min(5, bestsellersWithDiscount.length);
      const topRatedBooks = [...bestsellersWithDiscount]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, selectedCount);

      setBooks(topRatedBooks);
    }
  }, [allBooks]);

  const formatPrice = (value: number) => value.toFixed(2);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  if (books.length === 0) {
    return null;
  }

  return (
    <Box
      position="relative"
      w="384px"
      h="662px"
      bg="gray.500"
      borderRadius="2xl"
      overflow="hidden"
      flexShrink={0}
    >
      <VStack gap={0} h="full" px={6} pt={8} pb={6} align="center">
        <VStack gap={1} mb={6} align="center" w="full">
          <Text
            fontSize="5xl"
            fontWeight="extrabold"
            color="white"
            lineHeight={1.1}
          >
            Best Seller
          </Text>
          <Text fontSize="sm" color="gray.200">
            Based sales this week
          </Text>
        </VStack>

        <Box w="full" position="relative" flex={1}>
          <Button
            position="absolute"
            left={-5}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrev}
            borderRadius="full"
            w={9}
            h={9}
            minW={9}
            bg="rgba(255, 255, 255, 0.25)"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.4)" }}
            zIndex={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={0}
          >
            <FaChevronLeft size={14} />
          </Button>

          <Box w="full" h="full">
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="mini-slider-banner"
              style={{ height: "100%" }}
            >
              {books.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link
                    to={`/books/${book.id}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <VStack
                      gap={3}
                      align="center"
                      justify="flex-start"
                      w="full"
                      h="full"
                      cursor="pointer"
                    >
                      <Box
                        w="220px"
                        h="310px"
                        bg="bg.skeleton"
                        borderRadius="2xl"
                        overflow="hidden"
                        flexShrink={0}
                      >
                        {book.cover && (
                          <Image
                            src={`${book.cover}/220/310`}
                            alt={book.title}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        )}
                      </Box>

                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        lineHeight={1.2}
                        css={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {book.title}
                      </Text>

                      <Text
                        fontSize="xs"
                        color="gray.300"
                        textAlign="center"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        css={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {book.genre}, {book.language}, {book.format}
                      </Text>

                      <HStack
                        as="button"
                        gap={3}
                        bg="bg.surface"
                        px={7}
                        py={3}
                        borderRadius="xl"
                        w="auto"
                        justify="center"
                        mt={1}
                        cursor="pointer"
                      >
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="gray.400"
                          textDecoration="line-through"
                        >
                          {formatPrice(book.price)}
                        </Text>
                        <Text
                          fontSize="xl"
                          fontWeight="extrabold"
                          color="text.strong"
                        >
                          USD {formatPrice(book.discounted_price)}
                        </Text>
                      </HStack>
                    </VStack>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Button
            position="absolute"
            right={-5}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNext}
            borderRadius="full"
            w={9}
            h={9}
            minW={9}
            bg="rgba(255, 255, 255, 0.25)"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.4)" }}
            zIndex={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={0}
          >
            <FaChevronRight size={14} />
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default MiniSliderInBanner;
