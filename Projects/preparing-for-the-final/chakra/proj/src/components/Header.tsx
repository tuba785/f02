import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FiSun, FiMoon, FiInfo, FiLogOut } from "react-icons/fi";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      px={6}
      py={3}
      borderBottomWidth="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      bg={colorMode === "light" ? "white" : "gray.800"}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between">
        <Text
          fontSize="xl"
          fontWeight="700"
          letterSpacing="widest"
          color={colorMode === "light" ? "blue.600" : "blue.300"}
          textTransform="uppercase"
        >
          Маяк
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Avatar
                size="sm"
                name="Пользователь"
                cursor="pointer"
                bg="blue.500"
              />
            </PopoverTrigger>
            <PopoverContent w="180px" shadow="lg">
              <PopoverBody p={2}>
                <Button
                  leftIcon={<FiInfo />}
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  size="sm"
                  mb={1}
                >
                  Информация
                </Button>
                <Divider mb={1} />
                <Button
                  leftIcon={<FiLogOut />}
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  size="sm"
                  colorScheme="red"
                >
                  Выйти
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Flex>
    </Box>
  );
}
