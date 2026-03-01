import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  removeFavorite,
  clearAllFavorites,
} from "../../../store/slices/favoritesSlice";
import type { Book } from "../../../types/book";
import { useTranslation } from "react-i18next";

interface FavoriteProps {
  isOpen: boolean;
  onClose: () => void;
}

const Favorite = ({ isOpen, onClose }: FavoriteProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const panelRef = useRef<HTMLDivElement>(null);
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const allBooks = useSelector((state: RootState) => state.books.items);

  const favoriteBooks: Book[] = favoriteIds
    .map((id) => allBooks.find((b) => b.id === id))
    .filter((b): b is Book => !!b);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.400"
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? "auto" : "none"}
        transition="opacity 0.25s"
        zIndex={9}
      />

      <Box
        ref={panelRef}
        position="fixed"
        top="100px"
        right={0}
        h="calc(100vh - 100px)"
        w="400px"
        maxW="90vw"
        bg="bg.surface"
        boxShadow="-4px 0 24px rgba(0,0,0,0.1)"
        borderLeftRadius="16px"
        zIndex={11}
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s ease"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Flex
          align="center"
          justify="space-between"
          px={6}
          py={5}
          borderBottom="1px solid"
          borderColor="border.subtle"
          flexShrink={0}
        >
          <Flex align="center" gap={2}>
            <FaHeart size={18} color="var(--chakra-colors-brand-purple)" />
            <Text fontSize="18px" fontWeight="800" color="text.primary">
              {t("favorites.title")}
            </Text>
            {favoriteBooks.length > 0 && (
              <Flex
                align="center"
                justify="center"
                minW="22px"
                h="22px"
                px="6px"
                borderRadius="11px"
                bg="brand.purple"
                color="text.onBrand"
                fontSize="11px"
                fontWeight="700"
              >
                {favoriteBooks.length}
              </Flex>
            )}
          </Flex>
          <Flex
            align="center"
            justify="center"
            w="36px"
            h="36px"
            borderRadius="10px"
            cursor="pointer"
            transition="background 0.15s"
            _hover={{ bg: "hover.surface" }}
            onClick={onClose}
          >
            <FiX size={20} color="var(--chakra-colors-text-secondary)" />
          </Flex>
        </Flex>

        {favoriteBooks.length > 0 && (
          <Flex
            align="center"
            justify="center"
            gap={2}
            mx={6}
            mt={4}
            mb={1}
            px={4}
            h="38px"
            borderRadius="10px"
            border="1.5px solid"
            borderColor="status.error"
            color="status.error"
            cursor="pointer"
            fontWeight="600"
            fontSize="13px"
            transition="all 0.15s"
            _hover={{ bg: "hover.danger" }}
            flexShrink={0}
            onClick={() => dispatch(clearAllFavorites())}
          >
            <FaTrash size={12} />
            <Text>{t("favorites.remove_all")}</Text>
          </Flex>
        )}

        <Box flex={1} overflowY="auto" px={6} py={4}>
          {favoriteBooks.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              h="full"
              gap={3}
            >
              <Box
                w="56px"
                h="56px"
                borderRadius="full"
                bg="brand.purpleFaint"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaHeart size={22} color="var(--chakra-colors-brand-purple)" />
              </Box>
              <Text fontSize="15px" fontWeight="600" color="text.primary">
                {t("favorites.empty_title")}
              </Text>
              <Text
                fontSize="13px"
                color="text.secondary"
                textAlign="center"
                maxW="260px"
              >
                {t("favorites.empty_description")}
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap={3}>
              {favoriteBooks.map((book) => (
                <FavoriteItem
                  key={book.id}
                  book={book}
                  onRemove={() => dispatch(removeFavorite(book.id))}
                  onNavigate={onClose}
                />
              ))}
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
};

interface FavoriteItemProps {
  book: Book;
  onRemove: () => void;
  onNavigate: () => void;
}

const THUMB = 60;

const FavoriteItem = ({ book, onRemove, onNavigate }: FavoriteItemProps) => {
  const hasDiscount = book.discount !== null && book.discount > 0;

  return (
    <Flex
      bg="bg.surfaceMuted"
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="12px"
      p={3}
      gap={3}
      align="center"
      transition="box-shadow 0.15s"
      _hover={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      <Link
        to={`/books/${book.id}`}
        onClick={onNavigate}
        style={{ flexShrink: 0 }}
      >
        <Box
          w={`${THUMB}px`}
          h={`${THUMB + 20}px`}
          bg="bg.placeholder"
          borderRadius="8px"
          overflow="hidden"
          cursor="pointer"
        >
          {book.cover && (
            <Image
              src={`${book.cover}/${THUMB * 2}/${(THUMB + 20) * 2}`}
              alt={book.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          )}
        </Box>
      </Link>

      <Link
        to={`/books/${book.id}`}
        onClick={onNavigate}
        style={{ flex: 1, minWidth: 0, textDecoration: "none" }}
      >
        <Flex direction="column" gap={0.5} cursor="pointer">
          <Text
            fontSize="13px"
            fontWeight="700"
            color="text.primary"
            lineClamp={1}
          >
            {book.title}
          </Text>
          <Text fontSize="11px" color="text.secondary" lineClamp={1}>
            {book.author}
          </Text>
          <Flex align="baseline" gap={1.5} mt={0.5}>
            <Text fontSize="14px" fontWeight="700" color="text.primary">
              ${book.discounted_price.toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text
                fontSize="11px"
                color="text.tertiary"
                textDecoration="line-through"
              >
                ${book.price.toFixed(2)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Link>

      <Box
        w="36px"
        h="36px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="8px"
        border="1.5px solid"
        borderColor="brand.purple"
        bg="bg.surface"
        color="brand.purple"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ bg: "hover.brand" }}
        flexShrink={0}
        onClick={onRemove}
      >
        <FaHeart size={14} />
      </Box>
    </Flex>
  );
};

export default Favorite;
