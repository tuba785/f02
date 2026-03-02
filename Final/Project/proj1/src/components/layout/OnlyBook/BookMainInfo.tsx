import { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Spinner, Input } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaThumbsUp,
  FaComment,
  FaMinus,
  FaPlus,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { setCartQty } from "../../../store/slices/cartSlice";
import { AddToCartBtn, HeartBtn, StarRating } from "../OnlyBooks/BooksBtnCom";
import { bookService } from "../../../services/bookService";
import type { Book } from "../../../types/book";
import { useTranslation } from "react-i18next";

const COVER_W = 400;
const COVER_H = 572;

const formatLikes = (n: number): string => {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
};

interface BookMainInfoProps {
  bookId?: string;
}

const BookMainInfo = ({ bookId = "15" }: BookMainInfoProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartQty = useSelector(
    (state: RootState) =>
      state.cart.items.find((i) => i.bookId === bookId)?.qty ?? 0,
  );
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const qty = cartQty || 1;
  const setQty = (val: number | ((prev: number) => number)) => {
    const newVal = typeof val === "function" ? val(qty) : val;
    if (newVal >= 1) dispatch(setCartQty({ bookId, qty: newVal }));
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    bookService
      .fetchBookById(bookId)
      .then((b) => setBook(b))
      .catch(() => setError(t("book_detail.failed_to_load_book")))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" py={20}>
        <Spinner size="lg" color="brand.purple" />
      </Flex>
    );
  }

  if (error || !book) {
    return (
      <Flex justify="center" py={10}>
        <Text color="red.500" fontSize="16px" fontWeight="600">
          {error ?? t("book_detail.book_not_found")}
        </Text>
      </Flex>
    );
  }

  const hasDiscount = book.discount !== null && book.discount > 0;
  const year = book.release_date?.split("/")[2];
  const authorImg = `https://picsum.photos/seed/author${book.id}/48/48`;

  const socials = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      bg: "#3b5998",
      url: "https://www.facebook.com",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      bg: "#1da1f2",
      url: "https://www.x.com",
    },
    {
      icon: FaWhatsapp,
      label: "Whatsapp",
      bg: "#25d366",
      url: "https://www.whatsapp.com",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      bg: "#555555",
      url: "https://mail.google.com",
    },
  ];

  return (
    <Flex
      bg="bg.page"
      borderRadius="20px"
      py={10}
      gap="60px"
      align="stretch"
      w="full"
    >
      <Box
        w={`${COVER_W}px`}
        minW={`${COVER_W}px`}
        h={`${COVER_H}px`}
        bg="bg.skeleton"
        borderRadius="16px"
        overflow="hidden"
        flexShrink={0}
        position="relative"
      >
        {book.cover && (
          <Image
            src={`${book.cover}/${COVER_W}/${COVER_H}`}
            alt={book.title}
            w="full"
            h="full"
            objectFit="cover"
          />
        )}
      </Box>

      <Flex flex={1} direction="column" gap={4} minW={0}>
        <Text fontSize="32px" fontWeight="800" color="text.heading">
          {book.title}
        </Text>

        <Flex align="center" gap={3} flexWrap="wrap">
          <StarRating rating={book.rating} size={20} />
          <Text fontSize="18px" fontWeight="700" color="text.heading">
            {book.rating}
          </Text>
          <Flex align="center" gap={1} color="brand.purple" fontSize="14px">
            <FaComment size={13} />
            <Text>
              {book.comments_count} {t("book_detail.reviews")}
            </Text>
          </Flex>
          <Flex align="center" gap={1} color="brand.purple" fontSize="14px">
            <FaThumbsUp size={13} />
            <Text>
              {formatLikes(book.likes_count)} {t("book_detail.like")}
            </Text>
          </Flex>

          <Flex gap={2} flexShrink={0} ml="auto">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  gap={1.5}
                  bg={s.bg}
                  color="text.onBrand"
                  px={3}
                  h="32px"
                  borderRadius="8px"
                  cursor="pointer"
                  fontSize="13px"
                  fontWeight="600"
                  transition="opacity 0.15s"
                  _hover={{ opacity: 0.85 }}
                >
                  <s.icon size={12} />
                  <Text>{s.label}</Text>
                </Flex>
              </a>
            ))}
          </Flex>
        </Flex>

        <Text fontSize="15px" color="text.muted" lineHeight="1.75">
          {book.description}
        </Text>

        <Flex
          align="center"
          gap={8}
          borderBottom="1px dashed"
          borderBottomColor="border.default"
          py={4}
          mt="auto"
        >
          <Flex align="center" gap={3}>
            <Image
              src={authorImg}
              alt={book.author}
              w="44px"
              h="44px"
              borderRadius="full"
              objectFit="cover"
              bg="bg.skeleton"
            />
            <Flex direction="column">
              <Text fontSize="13px" color="text.muted" fontWeight="400">
                {t("book_detail.written_by")}
              </Text>
              <Text fontSize="15px" fontWeight="700" color="text.strong">
                {book.author}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column">
            <Text fontSize="13px" color="text.muted" fontWeight="400">
              {t("book_detail.publisher")}
            </Text>
            <Text fontSize="15px" fontWeight="700" color="text.strong">
              {book.publisher}
            </Text>
          </Flex>

          <Flex direction="column">
            <Text fontSize="13px" color="text.muted" fontWeight="400">
              {t("book_detail.year")}
            </Text>
            <Text fontSize="15px" fontWeight="700" color="text.strong">
              {year}
            </Text>
          </Flex>

          <Flex gap={3} ml="auto" align="center">
            <Flex
              align="center"
              gap={2}
              bg="brand.lightPurple"
              borderRadius="full"
              px={5}
              h="42px"
            >
              <FaBolt size={16} color="var(--chakra-colors-brand-purple)" />
              <Text
                fontSize="14px"
                fontWeight="700"
                color="brand.purple"
                textTransform="uppercase"
              >
                {t("book_detail.free_shipping")}
              </Text>
            </Flex>
            <Flex
              align="center"
              gap={2}
              bg="#e8f5e9"
              borderRadius="full"
              px={5}
              h="42px"
            >
              <FaCheckCircle size={16} color="#4caf50" />
              <Text
                fontSize="14px"
                fontWeight="700"
                color="#4caf50"
                textTransform="uppercase"
              >
                {t("book_detail.in_stocks")}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="center" gap={4} mt={1}>
          <Flex align="baseline" gap={2}>
            <Text fontSize="36px" fontWeight="800" color="text.heading">
              ${book.discounted_price.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text
                fontSize="18px"
                fontWeight="400"
                color="text.muted"
                textDecoration="line-through"
              >
                ${book.price.toFixed(2)}
              </Text>
            )}
          </Flex>

          {hasDiscount && (
            <Flex
              align="center"
              justify="center"
              bg="brand.purple"
              color="text.onBrand"
              fontSize="13px"
              fontWeight="700"
              px={2.5}
              h="26px"
              borderRadius="6px"
            >
              {book.discount}%
            </Flex>
          )}
          {book.is_bestseller && (
            <Flex
              align="center"
              justify="center"
              bg="brand.orange"
              color="text.onBrand"
              fontSize="13px"
              fontWeight="700"
              px={2.5}
              h="26px"
              borderRadius="6px"
            >
              {t("book_list.bestseller")}
            </Flex>
          )}

          <Flex align="center" gap={0} ml="auto">
            <Flex
              align="center"
              justify="center"
              w="40px"
              h="44px"
              border="1.5px solid"
              borderColor="border.default"
              borderRightWidth={0}
              borderLeftRadius="10px"
              cursor="pointer"
              color="brand.purple"
              _hover={{ bg: "brand.lightPurple" }}
              transition="background 0.15s"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              <FaMinus size={12} />
            </Flex>
            <Input
              w="50px"
              h="44px"
              textAlign="center"
              border="1.5px solid"
              borderColor="border.default"
              borderRadius={0}
              fontWeight="700"
              fontSize="15px"
              value={qty}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v) && v >= 1) setQty(v);
              }}
            />
            <Flex
              align="center"
              justify="center"
              w="40px"
              h="44px"
              border="1.5px solid"
              borderColor="border.default"
              borderLeftWidth={0}
              borderRightRadius="10px"
              cursor="pointer"
              color="brand.purple"
              _hover={{ bg: "brand.lightPurple" }}
              transition="background 0.15s"
              onClick={() => setQty((q) => q + 1)}
            >
              <FaPlus size={12} />
            </Flex>
          </Flex>

          <AddToCartBtn bookId={bookId} qty={qty} />
          <HeartBtn bookId={bookId} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookMainInfo;
