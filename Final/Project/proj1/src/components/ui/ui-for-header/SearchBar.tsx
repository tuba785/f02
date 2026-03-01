import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input, InputGroup } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp, FiGrid, FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBooks } from "../../../hooks/useBooks";
import Search from "../../layout/Modals/Search";
import Menus from "../../layout/Modals/Menus";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { books, getBooks } = useBooks();

  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (books.length === 0) getBooks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSearchOpen(query.trim().length > 0);
  }, [query]);

  const matchedBooks = query.trim()
    ? books
        .filter(
          (b) =>
            b.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            b.author.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const handleSearch = () => {
    if (query.trim()) {
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      navigate(`/books?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Flex ref={containerRef} position="relative" w="100%">
      <Flex
        w="100%"
        align="center"
        bg="bg.surface"
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="16px"
        overflow="hidden"
      >
        <Button
          display="flex"
          alignItems="center"
          gap={2}
          variant="ghost"
          color="brand.purple"
          borderRight="1px solid"
          borderColor="border.subtle"
          bg="bg.surface"
          h="44px"
          px="18px"
          borderRadius="0"
          fontWeight="600"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsSearchOpen(false);
          }}
        >
          <FiGrid />
          <Box as="span">{t("header.menus")}</Box>
          {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
        </Button>

        <Box w="1px" h="44px" bg="border.header" />

        <InputGroup flex="1">
          <Input
            size="md"
            placeholder={t("header.search_placeholder")}
            bg="bg.surface"
            border="none"
            h="44px"
            color="text.primary"
            _placeholder={{ color: "text.tertiary" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
            caretColor="brand.purple"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsMenuOpen(false);
            }}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>

        <Flex
          align="center"
          justify="center"
          w="56px"
          h="44px"
          borderLeft="1px solid"
          borderColor="border.subtle"
          color="brand.purple"
          bg="bg.surface"
          cursor="pointer"
          transition="background 0.15s"
          _hover={{ bg: "bg.subtler" }}
          onClick={handleSearch}
        >
          <FiSearch />
        </Flex>
      </Flex>

      <Menus isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Search
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        books={matchedBooks}
        query={query}
      />
    </Flex>
  );
};

export default SearchBar;
