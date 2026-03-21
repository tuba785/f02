import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import ProfileSettings from "../../layout/Modals/ProfileSettings";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../store/store";

const ProfileButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullName = [currentUser?.last_name, currentUser?.first_name]
    .filter(Boolean)
    .join(" ");
  const userName = fullName || currentUser?.email || t("header.profile");
  const rawRole = (currentUser?.role || "user").toLowerCase();
  const userRole =
    rawRole === "admin"
      ? t("header.role_admin")
      : rawRole === "user"
        ? t("header.role_user")
        : currentUser?.role || t("header.role_user");

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
          <Box as="span">{t("header.profile")}</Box>
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
                  {userName}
                </Text>
                <Text fontSize="12px" color="text.secondary">
                  {userRole}
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
                {t("header.account_settings")}
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
                {t("header.log_out")}
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
