import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import { PRIMARY_PURPLE, PRIMARY_LIGHT_PURPLE } from "../../../styles/colors";
import ProfileSettings from "../../layout/Modals/ProfileSettings";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <Box ref={containerRef} position="relative">
        <Button
          display="flex"
          alignItems="center"
          gap={2}
          bg={PRIMARY_PURPLE}
          color="white"
          h="44px"
          px="18px"
          borderRadius="14px"
          _hover={{ opacity: 0.85 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiUser />
          <Box as="span">Profile</Box>
        </Button>

        {isOpen && (
          <Box
            position="absolute"
            top="100%"
            right={0}
            mt={2}
            bg="white"
            border="1px solid #e8e8e8"
            borderRadius="16px"
            boxShadow="0 8px 32px rgba(0,0,0,0.12)"
            p={4}
            zIndex={20}
            w="240px"
          >
            <Flex align="center" gap={3} px={3} py={3} mb={1}>
              <Flex
                align="center"
                justify="center"
                w="40px"
                h="40px"
                borderRadius="full"
                bg={PRIMARY_LIGHT_PURPLE}
                flexShrink={0}
              >
                <FiUser size={18} color={PRIMARY_PURPLE} />
              </Flex>
              <Box>
                <Text fontSize="14px" fontWeight="700" color="#11142d">
                  Admin Admin
                </Text>
                <Text fontSize="12px" color="#808191">
                  Administrator
                </Text>
              </Box>
            </Flex>

            <Box h="1px" bg="#f0f0f0" mx={2} mb={1} />

            <Flex
              align="center"
              gap={3}
              px={3}
              py={3}
              borderRadius="10px"
              cursor="pointer"
              transition="background 0.15s"
              _hover={{ bg: "#f8f8fb" }}
              onClick={() => {
                setIsOpen(false);
                setIsSettingsOpen(true);
              }}
            >
              <FiSettings size={16} color="#808191" />
              <Text fontSize="14px" fontWeight="600" color="#11142d">
                Account Settings
              </Text>
            </Flex>

            <Flex
              align="center"
              gap={3}
              px={3}
              py={3}
              borderRadius="10px"
              cursor="pointer"
              transition="background 0.15s"
              _hover={{ bg: "#fff5f5" }}
              onClick={handleLogout}
            >
              <FiLogOut size={16} color="#e53e3e" />
              <Text fontSize="14px" fontWeight="600" color="#e53e3e">
                Log Out
              </Text>
            </Flex>
          </Box>
        )}
      </Box>

      {createPortal(
        <ProfileSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />,
        document.body,
      )}
    </>
  );
};

export default ProfileButton;
