import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <Box minH="100vh">
      <Header />
      <Flex>
        <Sidebar />
        <Box flex={1} p={6} overflowX="auto">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
