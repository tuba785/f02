import { useEffect, useState } from "react";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useBooks } from "../../../../hooks/useBooks";
import type { Book } from "../../../../types/book";
import "swiper/css";
import "swiper/css/navigation";

const BOOK_COVER_WIDTH = 140;
const BOOK_COVER_HEIGHT = 200;

const getRandomBooks = (books: Book[], count: number) => {
  const shuffled = [...books].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const BannerContent2 = () => {
  const { books, loading, getBooks } = useBooks();
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (books.length === 0 && loading === "idle") {
      getBooks();
    }
  }, [books.length, loading, getBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setRandomBooks(getRandomBooks(books, 10));
    }
  }, [books]);

  return (
    <Box
      width="795px"
      height="445px"
      position="relative"
      mx="auto"
      backgroundImage={`url('src/assets/banners/home-banner2.png')`}
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
        paddingBottom="32px"
      >
        <Text fontSize="28px" fontWeight="700" color="#1a202c">
          Recommended For You
        </Text>
        <Text fontSize="14px" color="#4a5568" lineHeight="1.6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          backgroundColor="white"
          boxShadow="0 8px 20px rgba(0, 0, 0, 0.12)"
          color="black"
          _hover={{ backgroundColor: "#f7fafc" }}
          className="banner2-prev"
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
          backgroundColor="white"
          boxShadow="0 8px 20px rgba(0, 0, 0, 0.12)"
          color="black"
          _hover={{ backgroundColor: "#f7fafc" }}
          className="banner2-next"
          opacity={isAtEnd ? 0 : 1}
          visibility={isAtEnd ? "hidden" : "visible"}
          pointerEvents={isAtEnd ? "none" : "auto"}
        >
          <HiArrowRight size={20} />
        </IconButton>

        <Swiper
          key={randomBooks.length}
          modules={[Navigation]}
          navigation={{
            prevEl: ".banner2-prev",
            nextEl: ".banner2-next",
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
          {randomBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <Box
                width={`${BOOK_COVER_WIDTH}px`}
                height={`${BOOK_COVER_HEIGHT}px`}
                borderRadius="12px"
                overflow="hidden"
                backgroundColor="#cbd5e0"
                boxShadow="inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
              >
                <Image
                  src={`${book.cover}/${BOOK_COVER_WIDTH}/${BOOK_COVER_HEIGHT}`}
                  alt={book.title}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
