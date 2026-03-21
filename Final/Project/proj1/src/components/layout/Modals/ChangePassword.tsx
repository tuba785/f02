import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const PASS_MIN = 10;
const PASS_MAX = 50;
const API_URL = "https://699ec8af78dda56d396b55cf.mockapi.io/api/v1/accounts";

const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-]*$/;

interface Account {
  id: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateNewPassword = (value: string): string | null => {
    if (!value.trim()) return t("signup.required");
    if (value.length < PASS_MIN)
      return t("signup.password_min", { count: PASS_MIN });
    if (value.length > PASS_MAX)
      return t("signup.max_chars", { count: PASS_MAX });
    if (!PASSWORD_PATTERN.test(value)) return t("signup.password_english_only");
    if (!/[A-Z]/.test(value)) return t("signup.password_uppercase");
    if (!/[a-z]/.test(value)) return t("signup.password_lowercase");
    if (!/\d/.test(value)) return t("signup.password_digit");
    if (!/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-]/.test(value)) {
      return t("signup.password_special");
    }

    return null;
  };

  const oldPasswordError =
    submitted && !oldPassword.trim() ? t("signup.required") : null;
  const newPasswordError = submitted ? validateNewPassword(newPassword) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (oldPasswordError || newPasswordError) return;
    if (!currentUser?.email) {
      setErrorMessage(t("profile_settings.change_password_error"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(t("profile_settings.change_password_error"));
      }

      const accounts: Account[] = await response.json();
      const account = accounts.find((item) => item.email === currentUser.email);

      if (!account || account.password !== oldPassword) {
        setErrorMessage(t("profile_settings.old_password_incorrect"));
        setLoading(false);
        return;
      }

      const updateResponse = await fetch(`${API_URL}/${account.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...account, password: newPassword }),
      });

      if (!updateResponse.ok) {
        throw new Error(t("profile_settings.change_password_error"));
      }

      setOldPassword("");
      setNewPassword("");
      setSubmitted(false);
      setSuccessMessage(t("profile_settings.password_changed"));
    } catch (error) {
      console.error("Change password error:", error);
      setErrorMessage(t("profile_settings.change_password_error"));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "1px solid",
    borderColor: "border.input",
    borderRadius: "10px",
    h: "44px",
    px: "14px",
    fontSize: "14px",
    bg: "bg.input",
    color: "text.primary",
    _placeholder: { color: "text.placeholder" },
    _focusVisible: {
      borderColor: "brand.purple",
      boxShadow: "0 0 0 1px var(--chakra-colors-brand-purple)",
    },
  };

  return (
    <Box
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="12px"
      p={4}
    >
      <Text fontSize="16px" fontWeight="700" color="text.primary" mb={4}>
        {t("profile_settings.change_password_title")}
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack align="stretch" gap={3}>
          <Box>
            <Text
              fontSize="11px"
              fontWeight="600"
              color="text.placeholder"
              mb={1.5}
            >
              {t("profile_settings.old_password")}
            </Text>
            <Input
              {...inputStyle}
              type="password"
              placeholder={t("profile_settings.old_password_placeholder")}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              borderColor={oldPasswordError ? "status.errorBorder" : undefined}
              disabled={loading}
            />
            {oldPasswordError && (
              <Text fontSize="12px" color="status.error" mt={1}>
                {oldPasswordError}
              </Text>
            )}
          </Box>

          <Box>
            <Text
              fontSize="11px"
              fontWeight="600"
              color="text.placeholder"
              mb={1.5}
            >
              {t("profile_settings.new_password")}
            </Text>
            <Input
              {...inputStyle}
              type="password"
              placeholder={t("profile_settings.new_password_placeholder")}
              value={newPassword}
              maxLength={PASS_MAX}
              onChange={(e) => setNewPassword(e.target.value)}
              borderColor={newPasswordError ? "status.errorBorder" : undefined}
              disabled={loading}
            />
            {newPasswordError && (
              <Text fontSize="12px" color="status.error" mt={1}>
                {newPasswordError}
              </Text>
            )}
          </Box>

          {errorMessage && (
            <Text fontSize="12px" color="status.error">
              {errorMessage}
            </Text>
          )}

          {successMessage && (
            <Text fontSize="12px" color="status.success">
              {successMessage}
            </Text>
          )}

          <Button
            type="submit"
            h="42px"
            bg="brand.purple"
            color="text.onBrand"
            borderRadius="10px"
            fontWeight="600"
            fontSize="14px"
            _hover={{ opacity: 0.85 }}
            _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
            disabled={loading}
          >
            {loading
              ? t("profile_settings.change_password_loading")
              : t("profile_settings.change_password_submit")}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePassword;
