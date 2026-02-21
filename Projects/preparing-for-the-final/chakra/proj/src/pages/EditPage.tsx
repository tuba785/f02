import {
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";

export default function EditPage() {
  return (
    <Box maxW="700px">
      <Text fontSize="xl" fontWeight="600" mb={5}>
        Редактирование
      </Text>

      <Card variant="outline">
        <CardHeader pb={2}>
          <Text fontWeight="500" fontSize="md">
            Данные пользователя
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">ID</FormLabel>
                <Input
                  size="sm"
                  placeholder="1"
                  borderRadius="md"
                  isReadOnly
                  bg="gray.50"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Имя</FormLabel>
                <Input
                  size="sm"
                  placeholder="Leanne Graham"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Email</FormLabel>
                <Input
                  size="sm"
                  placeholder="sincere@april.biz"
                  type="email"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Телефон</FormLabel>
                <Input
                  size="sm"
                  placeholder="+7 (999) 123-45-67"
                  borderRadius="md"
                />
              </FormControl>
            </SimpleGrid>

            <Button
              leftIcon={<FiSave />}
              colorScheme="blue"
              size="sm"
              alignSelf="flex-start"
              mt={2}
            >
              Сохранить
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
