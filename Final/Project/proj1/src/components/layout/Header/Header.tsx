import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useColorMode } from "../../ui/color-mode";
import type { RootState } from "../../../store/store";
import AuthActions from "../../ui/ui-for-header/AuthActions";
import CartButton from "../../ui/ui-for-header/CartButton";
import FavoritesButton from "../../ui/ui-for-header/FavoritesButton";
import LanguageSelect from "../../ui/ui-for-header/LanguageSelect";
import ProfileButton from "../../ui/ui-for-header/ProfileButton";
import SearchBar from "../../ui/ui-for-header/SearchBar";
import ThemeButton from "../../ui/ui-for-header/ThemeButton";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      w="100%"
      bg="bg.surface"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex
        h="100px"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8, lg: 12 }}
        gap={{ base: 4, lg: 6 }}
      >
        <HStack gap={4} minW="220px">
          <Link to="/">
            <Image
              src={
                colorMode === "dark"
                  ? "/bookoe-logo-dark.svg"
                  : "/bookoe-logo-main.svg"
              }
              alt="Bookoe logo"
              h="44px"
              cursor="pointer"
            />
          </Link>
        </HStack>

        <HStack gap={3} flex="1" justify="center" maxW="700px">
          <SearchBar />
        </HStack>

        <HStack gap={3} minW="280px" justify="flex-end">
          {isLoggedIn ? (
            <>
              <ProfileButton />
              <FavoritesButton />
              <CartButton />
            </>
          ) : (
            <AuthActions />
          )}
          <ThemeButton />
          <LanguageSelect />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
