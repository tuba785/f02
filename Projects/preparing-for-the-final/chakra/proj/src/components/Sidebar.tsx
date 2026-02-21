import { Box, VStack, Button, useColorMode } from "@chakra-ui/react";
import { FiGrid, FiEdit, FiCalendar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Компания", path: "/", icon: <FiGrid /> },
  { label: "Редактирование", path: "/edit", icon: <FiEdit /> },
  { label: "Календарь", path: "/calendar", icon: <FiCalendar /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();

  return (
    <Box
      w="200px"
      minH="calc(100vh - 57px)"
      borderRightWidth="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      py={4}
      px={3}
    >
      <VStack spacing={1} align="stretch">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              leftIcon={item.icon}
              variant={isActive ? "solid" : "ghost"}
              colorScheme={isActive ? "blue" : "gray"}
              justifyContent="flex-start"
              size="sm"
              fontWeight={isActive ? "600" : "400"}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          );
        })}
      </VStack>
    </Box>
  );
}
