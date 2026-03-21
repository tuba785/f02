import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../store/slices/authSlice";
import LoginImg from "../../../assets/images/LogIn.png";

const EMAIL_MAX = 50;
const PASS_MAX = 30;
const PASS_MIN = 6;
const API_URL = "https://699ec8af78dda56d396b55cf.mockapi.io/api/v1/accounts";

interface Account {
  id: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

const LoginComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const blur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const getError = (field: "email" | "password") => {
    const show = touched[field] || submitted;
    if (!show) return null;

    if (field === "email") {
      if (!email.trim()) return t("login.required");
      if (email.length > EMAIL_MAX)
        return t("login.max_chars", { count: EMAIL_MAX });
      if (!email.includes("@")) return t("login.invalid_email");
    }

    if (field === "password") {
      if (!password.trim()) return t("login.required");
      if (password.length < PASS_MIN)
        return t("login.min_chars", { count: PASS_MIN });
      if (password.length > PASS_MAX)
        return t("login.max_chars", { count: PASS_MAX });
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError(null);

    if (
      !email.trim() ||
      !email.includes("@") ||
      !password.trim() ||
      password.length < PASS_MIN
    ) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(t("login.error"));
      }

      const accounts: Account[] = await response.json();
      const user = accounts.find(
        (acc) => acc.email === email && acc.password === password,
      );

      if (!user) {
        setApiError(t("login.invalid_credentials"));
        setLoading(false);
        return;
      }

      dispatch(
        login({
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            role: user.role || "user",
          },
          rememberMe,
        }),
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setApiError(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "1px solid",
    borderColor: "border.input",
    borderRadius: "10px",
    h: "48px",
    px: "16px",
    fontSize: "14px",
    bg: "bg.input",
    color: "text.primary",
    _placeholder: { color: "text.placeholder" },
    _focusVisible: {
      borderColor: "brand.purple",
      boxShadow: "0 0 0 1px var(--chakra-colors-brand-purple)",
    },
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "600",
    color: "text.placeholder",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    mb: "6px",
  };

  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
    >
      <Flex
        w="100%"
        maxW="1200px"
        bg="bg.page"
        direction={{ base: "column", lg: "row" }}
        minH={{ lg: "600px" }}
      >
        <Box
          flex={1}
          display={{ base: "none", lg: "block" }}
          position="relative"
          minH="600px"
          borderRadius="20px"
          overflow="hidden"
        >
          <Image
            src={LoginImg}
            alt="Login"
            objectFit="cover"
            position="absolute"
            translate="-50% -50%"
            top="50%"
            left="50%"
            w="60%"
            h="100%"
          />
        </Box>

        <Box flex={1} p={{ base: 8, md: 12 }}>
          <VStack align="stretch" gap={2} mb={8}>
            <Text fontSize="32px" fontWeight="800" color="text.heading">
              {t("login.title")}
            </Text>
            <Text fontSize="15px" color="text.secondary">
              {t("login.subtitle")}
            </Text>
          </VStack>

          <form onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {apiError && (
                <Box
                  bg="status.error"
                  color="text.onError"
                  p={3}
                  borderRadius="10px"
                  fontSize="14px"
                >
                  {apiError}
                </Box>
              )}

              <Box>
                <Text {...labelStyle}>{t("login.email")}</Text>
                <Input
                  {...inputStyle}
                  type="email"
                  placeholder={t("login.email_placeholder")}
                  value={email}
                  maxLength={EMAIL_MAX}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => blur("email")}
                  borderColor={getError("email") ? "red.400" : undefined}
                  disabled={loading}
                />
                {getError("email") && (
                  <Text fontSize="12px" color="status.error" mt={1}>
                    {getError("email")}
                  </Text>
                )}
              </Box>

              <Box>
                <Text {...labelStyle}>{t("login.password")}</Text>
                <Input
                  {...inputStyle}
                  type="password"
                  placeholder={t("login.password_placeholder")}
                  value={password}
                  maxLength={PASS_MAX}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => blur("password")}
                  borderColor={getError("password") ? "red.400" : undefined}
                  disabled={loading}
                />
                {getError("password") && (
                  <Text fontSize="12px" color="status.error" mt={1}>
                    {getError("password")}
                  </Text>
                )}
              </Box>

              <Flex justify="space-between" align="center">
                <Checkbox.Root
                  checked={rememberMe}
                  onCheckedChange={(e) => setRememberMe(!!e.checked)}
                  colorPalette="purple"
                  size="sm"
                  disabled={loading}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control
                    borderColor="border.control"
                    borderRadius="4px"
                    _checked={{
                      bg: "brand.purple",
                      borderColor: "brand.purple",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label fontSize="13px" color="text.secondary">
                    {t("login.remember_me")}
                  </Checkbox.Label>
                </Checkbox.Root>
                <Text
                  fontSize="13px"
                  color="brand.purple"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  {t("login.forgot_password")}
                </Text>
              </Flex>

              <Button
                type="submit"
                w="100%"
                h="50px"
                bg="brand.purple"
                color="text.onBrand"
                borderRadius="14px"
                fontSize="16px"
                fontWeight="700"
                _hover={{ opacity: 0.85 }}
                _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
                mt={2}
                disabled={loading}
              >
                {loading ? t("login.loading") : t("login.submit")}
              </Button>

              <Flex justify="center" gap={1} mt={2}>
                <Text fontSize="14px" color="text.secondary">
                  {t("login.no_account")}
                </Text>
                <Link to="/register">
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                    color="brand.purple"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {t("login.sign_up_link")}
                  </Text>
                </Link>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginComponent;
