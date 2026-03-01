import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Image, Input } from "@chakra-ui/react";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  setCartQty,
  removeFromCart,
  clearCart,
} from "../../../store/slices/cartSlice";
import type { Book } from "../../../types/book";
import { useTranslation } from "react-i18next";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const allBooks = useSelector((state: RootState) => state.books.items);

  const cartBooks = cartItems
    .map((ci) => {
      const book = allBooks.find((b) => b.id === ci.bookId);
      return book ? { book, qty: ci.qty } : null;
    })
    .filter((x): x is { book: Book; qty: number } => !!x);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.qty, 0);
  const totalPrice = cartBooks.reduce(
    (sum, { book, qty }) => sum + book.discounted_price * qty,
    0,
  );

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

  const handleGoToPayment = () => {
    onClose();
    navigate("/purchase");
  };

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
        w="420px"
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
            <FiShoppingCart
              size={18}
              color="var(--chakra-colors-brand-purple)"
            />
            <Text fontSize="18px" fontWeight="800" color="text.primary">
              {t("cart.title")}
            </Text>
            {totalItems > 0 && (
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
                {totalItems}
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

        {cartBooks.length > 0 && (
          <Flex gap={3} px={6} mt={4} mb={1} flexShrink={0}>
            <Flex
              flex={1}
              align="center"
              justify="center"
              gap={2}
              h="42px"
              borderRadius="10px"
              bg="brand.purple"
              color="text.onBrand"
              cursor="pointer"
              fontWeight="700"
              fontSize="14px"
              transition="opacity 0.15s"
              _hover={{ opacity: 0.85 }}
              onClick={handleGoToPayment}
            >
              <Text>{t("cart.go_to_payment")}</Text>
            </Flex>
            <Flex
              align="center"
              justify="center"
              gap={2}
              px={4}
              h="42px"
              borderRadius="10px"
              border="1.5px solid"
              borderColor="status.error"
              color="status.error"
              cursor="pointer"
              fontWeight="600"
              fontSize="13px"
              transition="all 0.15s"
              _hover={{ bg: "hover.danger" }}
              onClick={() => dispatch(clearCart())}
            >
              <FaTrash size={12} />
              <Text>{t("cart.clear")}</Text>
            </Flex>
          </Flex>
        )}

        <Box flex={1} overflowY="auto" px={6} py={4}>
          {cartBooks.length === 0 ? (
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
                <FiShoppingCart
                  size={22}
                  color="var(--chakra-colors-brand-purple)"
                />
              </Box>
              <Text fontSize="15px" fontWeight="600" color="text.primary">
                {t("cart.empty_title")}
              </Text>
              <Text
                fontSize="13px"
                color="text.secondary"
                textAlign="center"
                maxW="260px"
              >
                {t("cart.empty_description")}
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap={3}>
              {cartBooks.map(({ book, qty }) => (
                <CartItem
                  key={book.id}
                  book={book}
                  qty={qty}
                  onQtyChange={(newQty) =>
                    dispatch(setCartQty({ bookId: book.id, qty: newQty }))
                  }
                  onRemove={() => dispatch(removeFromCart(book.id))}
                  onNavigate={onClose}
                />
              ))}
            </Flex>
          )}
        </Box>

        {cartBooks.length > 0 && (
          <Flex
            align="center"
            justify="space-between"
            px={6}
            py={4}
            borderTop="1px solid"
            borderColor="border.subtle"
            flexShrink={0}
          >
            <Text fontSize="14px" fontWeight="600" color="text.secondary">
              {t("cart.total", { count: totalItems })}
            </Text>
            <Text fontSize="20px" fontWeight="800" color="text.primary">
              ${totalPrice.toFixed(2)}
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

interface CartItemProps {
  book: Book;
  qty: number;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
  onNavigate: () => void;
}

const THUMB = 60;

const CartItem = ({
  book,
  qty,
  onQtyChange,
  onRemove,
  onNavigate,
}: CartItemProps) => {
  const hasDiscount = book.discount !== null && book.discount > 0;
  const lineTotal = book.discounted_price * qty;

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
      {/* Thumbnail */}
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

      <Flex direction="column" gap={1} flex={1} minW={0}>
        <Link
          to={`/books/${book.id}`}
          onClick={onNavigate}
          style={{ textDecoration: "none" }}
        >
          <Text
            fontSize="13px"
            fontWeight="700"
            color="text.primary"
            lineClamp={1}
            cursor="pointer"
          >
            {book.title}
          </Text>
        </Link>
        <Flex align="baseline" gap={1.5}>
          <Text fontSize="13px" fontWeight="700" color="text.primary">
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

        <Flex align="center" gap={0} mt={0.5}>
          <Flex
            align="center"
            justify="center"
            w="28px"
            h="28px"
            border="1.5px solid"
            borderColor="border.default"
            borderRightWidth={0}
            borderLeftRadius="6px"
            cursor="pointer"
            color="brand.purple"
            _hover={{ bg: "hover.brand" }}
            transition="background 0.15s"
            onClick={() => onQtyChange(qty - 1)}
          >
            <FaMinus size={9} />
          </Flex>
          <Input
            w="36px"
            h="28px"
            textAlign="center"
            border="1.5px solid"
            borderColor="border.default"
            borderRadius={0}
            fontWeight="700"
            fontSize="12px"
            color="text.primary"
            px={0}
            value={qty}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v) && v >= 0) onQtyChange(v);
            }}
          />
          <Flex
            align="center"
            justify="center"
            w="28px"
            h="28px"
            border="1.5px solid"
            borderColor="border.default"
            borderLeftWidth={0}
            borderRightRadius="6px"
            cursor="pointer"
            color="brand.purple"
            _hover={{ bg: "hover.brand" }}
            transition="background 0.15s"
            onClick={() => onQtyChange(qty + 1)}
          >
            <FaPlus size={9} />
          </Flex>
          <Text fontSize="12px" fontWeight="600" color="text.secondary" ml={2}>
            = ${lineTotal.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="center"
        w="30px"
        h="30px"
        borderRadius="8px"
        cursor="pointer"
        transition="background 0.15s"
        _hover={{ bg: "hover.danger" }}
        flexShrink={0}
        onClick={onRemove}
      >
        <FiX size={16} color="var(--chakra-colors-status-error)" />
      </Flex>
    </Flex>
  );
};

export default Cart;
