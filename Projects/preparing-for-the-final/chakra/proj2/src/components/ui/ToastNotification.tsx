import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useAppSelector } from "../../hooks/useAppDispatch";

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

const ToastNotification = ({
  message,
  isVisible,
  onHide,
  duration = 3000,
}: ToastNotificationProps) => {
  const isDark = useAppSelector((state) => state.theme.mode) === "dark";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onHide, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex={9999}
      bg={isDark ? "gray.800" : "white"}
      border="1px solid"
      borderColor={isDark ? "gray.600" : "gray.100"}
      borderRadius="lg"
      boxShadow={
        isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.12)"
      }
      px={4}
      py={3}
      display="flex"
      alignItems="center"
      gap={3}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <Box color="green.400" display="flex" alignItems="center">
        <FiCheckCircle size={18} />
      </Box>
      <Text
        fontSize="sm"
        color={isDark ? "gray.200" : "gray.700"}
        fontWeight="medium"
      >
        {message}
      </Text>
    </Box>
  );
};

export default ToastNotification;
