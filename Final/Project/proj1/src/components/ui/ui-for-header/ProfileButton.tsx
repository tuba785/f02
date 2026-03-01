import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
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
          bg="brand.purple"
          color="text.onBrand"
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
            bg="bg.surface"
            border="1px solid"
            borderColor="border.default"
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
                bg="brand.lightPurple"
                flexShrink={0}
              >
                <FiUser size={18} />
              </Flex>
              <Box>
                <Text fontSize="14px" fontWeight="700" color="text.primary">
                  Admin Admin
                </Text>
                <Text fontSize="12px" color="text.secondary">
                  Administrator
                </Text>
              </Box>
            </Flex>

            <Box h="1px" bg="border.subtle" mx={2} mb={1} />

            <Flex
              align="center"
              gap={3}
              px={3}
              py={3}
              borderRadius="10px"
              cursor="pointer"
              transition="background 0.15s"
              _hover={{ bg: "bg.subtler" }}
              onClick={() => {
                setIsOpen(false);
                setIsSettingsOpen(true);
              }}
            >
              <FiSettings
                size={16}
                color="var(--chakra-colors-text-secondary)"
              />
              <Text fontSize="14px" fontWeight="600" color="text.primary">
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
              _hover={{ bg: "hover.danger" }}
              onClick={handleLogout}
            >
              <FiLogOut size={16} color="var(--chakra-colors-status-error)" />
              <Text fontSize="14px" fontWeight="600" color="status.error">
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
