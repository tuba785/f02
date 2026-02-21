import { Flex, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex
      justify="center"
      align="center"
      flex={1}
      h="100%"
      direction="column"
      gap={2}
    >
      <Text fontSize="6xl" fontWeight="bold" color="gray.300">
        404
      </Text>
      <Text fontSize="lg" color="gray.500">
        Страница не найдена
      </Text>
    </Flex>
  );
};

export default NotFound;
