import { Box, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useAppDispatch'

const EditEmployee = () => {
  const isDark = useAppSelector((state) => state.theme.mode) === 'dark'

  return (
    <Box
      w="100%"
      maxW="520px"
      bg={isDark ? 'gray.800' : 'white'}
      border="1px solid"
      borderColor={isDark ? 'gray.600' : 'gray.100'}
      borderRadius="xl"
      boxShadow={isDark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)'}
      p={8}
    >
      <Text fontSize="xl" fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
        Редактирование сотрудника
      </Text>
      <Text mt={4} color={isDark ? 'gray.400' : 'gray.500'} fontSize="sm">
        В разработке...
      </Text>
    </Box>
  )
}

export default EditEmployee