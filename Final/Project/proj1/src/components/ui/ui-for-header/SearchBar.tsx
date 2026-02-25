import { Box, Button, Flex, Input, InputGroup } from "@chakra-ui/react";
import { FiChevronDown, FiGrid, FiSearch } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const SearchBar = () => {
  return (
    <Flex
      w="100%"
      align="center"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="16px"
      overflow="hidden"
    >
      <Button
        display="flex"
        alignItems="center"
        gap={2}
        variant="ghost"
        color={PRIMARY_PURPLE}
        bg="white"
        h="44px"
        px="18px"
        borderRadius="0"
        fontWeight="600"
      >
        <FiGrid />
        <Box as="span">Menus</Box>
        <FiChevronDown />
      </Button>

      <Box w="1px" h="44px" bg="gray.200" />

      <InputGroup flex="1">
        <Input
          size="md"
          placeholder="Search over 30 million book titles"
          bg="white"
          border="none"
          h="44px"
          _placeholder={{ color: "gray.400" }}
          _focusVisible={{ boxShadow: "none", outline: "none" }}
          caretColor={PRIMARY_PURPLE}
        />
      </InputGroup>

      <Flex
        align="center"
        justify="center"
        w="56px"
        h="44px"
        borderLeft="1px solid"
        borderColor="gray.200"
        color={PRIMARY_PURPLE}
        bg="white"
      >
        <FiSearch />
      </Flex>
    </Flex>
  );
};

export default SearchBar;
