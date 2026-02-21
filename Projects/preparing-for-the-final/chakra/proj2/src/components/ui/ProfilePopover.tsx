import { Box, VStack, Button, HStack, Avatar, Text } from '@chakra-ui/react'
import { FiInfo, FiLogOut } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppDispatch'
import InfoModal from './InfoModal'

const ProfilePopover = () => {
  const isDark = useAppSelector((state) => state.theme.mode) === 'dark'
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <Box position="relative" ref={menuRef}>
        <HStack
          gap={2}
          cursor="pointer"
          px={2}
          py={1}
          borderRadius="md"
          _hover={{ bg: isDark ? 'gray.700' : 'gray.100' }}
          transition="all 0.2s"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Avatar.Root size="sm">
            <Avatar.Fallback name="Admin Admin" />
          </Avatar.Root>
          <Text fontSize="sm" fontWeight="medium" color={isDark ? 'gray.200' : 'gray.700'}>
            Admin Admin
          </Text>
        </HStack>

        {isMenuOpen && (
          <Box
            position="absolute"
            top="110%"
            right={0}
            w="180px"
            bg={isDark ? 'gray.800' : 'white'}
            border="1px solid"
            borderColor={isDark ? 'gray.600' : 'gray.100'}
            borderRadius="md"
            boxShadow={isDark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)'}
            zIndex={9999}
            p={2}
          >
            <VStack align="stretch" gap={1}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                fontSize="sm"
                color={isDark ? 'gray.200' : 'gray.700'}
                _hover={{ bg: isDark ? 'gray.700' : 'gray.100' }}
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsInfoOpen(true)
                }}
              >
                <FiInfo />
                Информация
              </Button>

              <Button
                variant="ghost"
                justifyContent="flex-start"
                gap={2}
                fontSize="sm"
                color="red.400"
                _hover={{ bg: isDark ? 'gray.700' : 'gray.100' }}
              >
                <FiLogOut />
                Выйти
              </Button>
            </VStack>
          </Box>
        )}
      </Box>

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  )
}

export default ProfilePopover