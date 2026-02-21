import { Box, Flex, Text, IconButton, HStack } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { toggleTheme } from '../../store/slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import ProfilePopover from '../ui/ProfilePopover'

const Header = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)
  const isDark = mode === 'dark'

  return (
    <Box
      as="header"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor={isDark ? 'gray.700' : 'gray.200'}
      bg={isDark ? 'gray.900' : 'white'}
      color={isDark ? 'white' : 'black'}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Маяк
        </Text>

        <HStack gap={3}>
          <ProfilePopover />

          <IconButton
            aria-label="Переключить тему"
            variant="ghost"
            color={isDark ? 'gray.200' : 'gray.600'}
            _hover={{ bg: isDark ? 'gray.700' : 'gray.100' }}
            onClick={() => dispatch(toggleTheme())}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header