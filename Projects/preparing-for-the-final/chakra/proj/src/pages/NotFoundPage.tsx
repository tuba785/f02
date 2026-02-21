import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4} textAlign="center">
        <Text fontSize="7xl" fontWeight="800" color="blue.400" lineHeight="1">
          404
        </Text>
        <Text fontSize="xl" fontWeight="500" color="gray.600">
          Страница не найдена
        </Text>
        <Text color="gray.400" fontSize="sm">
          Такой страницы не существует или она была удалена
        </Text>
        <Button
          leftIcon={<FiArrowLeft />}
          colorScheme="blue"
          variant="outline"
          mt={2}
          onClick={() => navigate("/")}
        >
          На главную
        </Button>
      </VStack>
    </Box>
  );
}
