import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useAppSelector } from '../../hooks/useAppDispatch'

const Layout = () => {
  const mode = useAppSelector((state) => state.theme.mode)

  return (
    <Flex
      direction="column"
      h="100vh"
      bg={mode === 'dark' ? 'gray.800' : 'white'}
      color={mode === 'dark' ? 'white' : 'black'}
      transition="all 0.2s"
    >
      <Header />
      <Flex flex={1} overflow="hidden">
        <Sidebar />
        <Box flex={1} p={6} overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Layout