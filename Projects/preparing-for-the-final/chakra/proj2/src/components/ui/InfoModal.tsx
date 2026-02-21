import {
  DialogRoot, DialogContent, DialogHeader,
  DialogBody, DialogCloseTrigger, DialogBackdrop
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useAppDispatch'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
}

const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  const isDark = useAppSelector((state) => state.theme.mode) === 'dark'

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
    >
      <DialogBackdrop
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={1200}
      />
      <DialogContent
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg={isDark ? 'gray.800' : 'white'}
        color={isDark ? 'white' : 'black'}
        zIndex={1300}
        maxW="600px"
        w="90%"
        minH="400px"
        maxH="80vh"
      >
        <DialogHeader
          fontSize="lg"
          fontWeight="bold"
          borderBottom="1px solid"
          borderColor={isDark ? 'gray.700' : 'gray.200'}
          pb={3}
        >
          Информация
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody py={6} overflowY="auto">
          <Text>Важная информация!</Text>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default InfoModal