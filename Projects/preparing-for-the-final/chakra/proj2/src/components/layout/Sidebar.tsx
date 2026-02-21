import { Box, VStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiFileText,
  FiCalendar,
  FiHelpCircle,
} from "react-icons/fi";
import { useAppSelector } from "../../hooks/useAppDispatch";

const navItems = [
  { label: "Главная", icon: <FiHome />, path: "/" },
  { label: "Компания", icon: <FiGrid />, path: "/company" },
  { label: "Форма", icon: <FiFileText />, path: "/form" },
  { label: "Календарь", icon: <FiCalendar />, path: "/calendar" },
  { label: "Помощь", icon: <FiHelpCircle />, path: "/help" },
];

const Sidebar = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <Box
      as="nav"
      w="220px"
      minH="100vh"
      borderRight="1px solid"
      borderColor={isDark ? "gray.700" : "gray.200"}
      bg={isDark ? "gray.900" : "white"}
      pt={6}
      px={3}
      transition="all 0.2s"
    >
      <VStack align="stretch" gap={1}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            style={({ isActive }) => ({
              textDecoration: "none",
              display: "block",
              backgroundColor: isActive
                ? isDark
                  ? "rgba(99, 179, 237, 0.15)"
                  : "var(--chakra-colors-blue-50)"
                : "transparent",
              color: isActive
                ? isDark
                  ? "#90cdf4"
                  : "var(--chakra-colors-blue-600)"
                : isDark
                  ? "#e2e8f0"
                  : "inherit",
              borderRadius: "8px",
            })}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={3}
              px={3}
              py={2.5}
              borderRadius="md"
              _hover={{
                bg: isDark ? "gray.700" : "gray.100",
                cursor: "pointer",
              }}
              fontWeight="medium"
              fontSize="sm"
            >
              {item.icon}
              <Text>{item.label}</Text>
            </Box>
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
