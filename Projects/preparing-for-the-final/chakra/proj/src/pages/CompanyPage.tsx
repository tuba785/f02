import { useEffect, useState } from 'react';
import {
  Box, Flex, Select, Spinner, Alert, AlertIcon,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Text, Badge, VStack, HStack, Card, CardBody,
  useColorMode,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUsers } from '../store/usersSlice';

type ViewMode = 'table' | 'list' | 'hierarchy';

export default function CompanyPage() {
  const dispatch = useAppDispatch();
  const { list: users, loading, error } = useAppSelector((s) => s.users);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsers());
  }, []);

  if (loading) return (
    <Flex justify="center" align="center" h="60vh">
      <Spinner size="xl" color="blue.500" />
    </Flex>
  );

  if (error) return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      {error}
    </Alert>
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={5}>
        <Text fontSize="xl" fontWeight="600">Компания</Text>
        <Select
          size="sm"
          w="160px"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as ViewMode)}
          borderRadius="md"
        >
          <option value="table">Таблица</option>
          <option value="list">Список</option>
          <option value="hierarchy">Иерархия</option>
        </Select>
      </Flex>

      {viewMode === 'table' && (
        <TableContainer borderRadius="lg" borderWidth="1px" borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
          <Table variant="simple" size="sm">
            <Thead bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}>
              <Tr>
                <Th>ID</Th>
                <Th>Имя</Th>
                <Th>Email</Th>
                <Th>Телефон</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr
                  key={user.id}
                  _hover={{ bg: colorMode === 'light' ? 'blue.50' : 'gray.700' }}
                  transition="background 0.15s"
                >
                  <Td><Badge colorScheme="blue" variant="subtle">{user.id}</Badge></Td>
                  <Td fontWeight="500">{user.name}</Td>
                  <Td color="gray.500" fontSize="sm">{user.email}</Td>
                  <Td color="gray.500" fontSize="sm">{user.phone}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {viewMode === 'list' && (
        <VStack spacing={3} align="stretch">
          {users.map((user) => (
            <Card key={user.id} size="sm" variant="outline" _hover={{ shadow: 'md' }} transition="box-shadow 0.2s">
              <CardBody>
                <Flex justify="space-between" align="center">
                  <HStack spacing={3}>
                    <Badge colorScheme="blue" variant="subtle">#{user.id}</Badge>
                    <Text fontWeight="600">{user.name}</Text>
                  </HStack>
                  <HStack spacing={4}>
                    <Text fontSize="sm" color="gray.500">{user.email}</Text>
                    <Text fontSize="sm" color="gray.500">{user.phone}</Text>
                  </HStack>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}

      {viewMode === 'hierarchy' && (
        <Box textAlign="center" py={16} color="gray.400">
          <Text fontSize="lg">Режим иерархии в разработке</Text>
        </Box>
      )}
    </Box>
  );
}