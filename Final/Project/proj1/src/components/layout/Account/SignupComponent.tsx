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
import { useNavigate, Link } from "react-router-dom";
import TermsInfo from "../MiniModals/TermsInfo";
import SignUpImg from "../../../assets/images/SignUp.png";

const NAME_MIN = 2;
const NAME_MAX = 30;
const EMAIL_MAX = 50;
const PASS_MIN = 10;
const PASS_MAX = 50;
const API_URL = "https://699ec8af78dda56d396b55cf.mockapi.io/api/v1/accounts";

const ENGLISH_ONLY_PATTERN = /^[a-zA-Z\s]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-]*$/;

interface Account {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

const SignupComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showTermsInfo, setShowTermsInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const blur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const validatePasswordComplexity = (pwd: string): string | null => {
    if (pwd.length < PASS_MIN) {
      return t("signup.password_min", { count: PASS_MIN });
    }

    if (!PASSWORD_PATTERN.test(pwd)) {
      return t("signup.password_english_only");
    }

    if (!/[A-Z]/.test(pwd)) {
      return t("signup.password_uppercase");
    }

    if (!/[a-z]/.test(pwd)) {
      return t("signup.password_lowercase");
    }

    if (!/\d/.test(pwd)) {
      return t("signup.password_digit");
    }

    if (!/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-]/.test(pwd)) {
      return t("signup.password_special");
    }

    return null;
  };

  const getError = (
    field: "firstName" | "lastName" | "email" | "password" | "confirmPassword",
  ) => {
    const show = touched[field] || submitted;
    if (!show) return null;

    if (field === "firstName") {
      if (!firstName.trim()) return t("signup.required");
      if (firstName.length < NAME_MIN)
        return t("signup.name_min", { count: NAME_MIN });
      if (firstName.length > NAME_MAX)
        return t("signup.max_chars", { count: NAME_MAX });
      if (!ENGLISH_ONLY_PATTERN.test(firstName))
        return t("signup.password_english_only");
    }

    if (field === "lastName") {
      if (!lastName.trim()) return t("signup.required");
      if (lastName.length < NAME_MIN)
        return t("signup.name_min", { count: NAME_MIN });
      if (lastName.length > NAME_MAX)
        return t("signup.max_chars", { count: NAME_MAX });
      if (!ENGLISH_ONLY_PATTERN.test(lastName))
        return t("signup.password_english_only");
    }

    if (field === "email") {
      if (!email.trim()) return t("signup.required");
      if (email.length > EMAIL_MAX)
        return t("signup.max_chars", { count: EMAIL_MAX });
      if (!EMAIL_PATTERN.test(email)) return t("signup.invalid_email");
    }

    if (field === "password") {
      if (!password.trim()) return t("signup.required");
      return validatePasswordComplexity(password);
    }

    if (field === "confirmPassword") {
      if (!confirmPassword.trim()) return t("signup.required");
      if (confirmPassword !== password) return t("signup.passwords_not_match");
    }

    return null;
  };

  const isValid = () => {
    return (
      firstName.trim() &&
      firstName.length >= NAME_MIN &&
      firstName.length <= NAME_MAX &&
      ENGLISH_ONLY_PATTERN.test(firstName) &&
      lastName.trim() &&
      lastName.length >= NAME_MIN &&
      lastName.length <= NAME_MAX &&
      ENGLISH_ONLY_PATTERN.test(lastName) &&
      email.trim() &&
      EMAIL_PATTERN.test(email) &&
      email.length <= EMAIL_MAX &&
      password.trim() &&
      password.length >= PASS_MIN &&
      password.length <= PASS_MAX &&
      !validatePasswordComplexity(password) &&
      confirmPassword === password &&
      agreeTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError(null);

    if (!agreeTerms) {
      setShowTermsInfo(true);
      return;
    }

    if (!isValid()) return;

    setLoading(true);

    try {
      const accountData: Account = {
        email: email.trim(),
        password: password.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        role: "user",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        throw new Error(t("signup.signup_error"));
      }

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(t("signup.signup_error"));
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
            src={SignUpImg}
            alt="Sign Up"
            objectFit="fill"
            position="absolute"
            translate="-50% -50%"
            top="60%"
            left="50%"
            w="80%"
            h="180%"
          />
        </Box>

        <Box flex={1} p={{ base: 8, md: 12 }}>
          <VStack align="stretch" gap={2} mb={8}>
            <Text fontSize="32px" fontWeight="800" color="text.heading">
              {t("signup.title")}
            </Text>
            <Text fontSize="15px" color="text.secondary">
              {t("signup.subtitle")}
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

              <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                <Box flex={1}>
                  <Text {...labelStyle}>{t("signup.first_name")}</Text>
                  <Input
                    {...inputStyle}
                    placeholder={t("signup.first_name_placeholder")}
                    value={firstName}
                    maxLength={NAME_MAX}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => blur("firstName")}
                    borderColor={getError("firstName") ? "red.400" : undefined}
                    disabled={loading}
                  />
                  {getError("firstName") && (
                    <Text fontSize="12px" color="status.error" mt={1}>
                      {getError("firstName")}
                    </Text>
                  )}
                </Box>
                <Box flex={1}>
                  <Text {...labelStyle}>{t("signup.last_name")}</Text>
                  <Input
                    {...inputStyle}
                    placeholder={t("signup.last_name_placeholder")}
                    value={lastName}
                    maxLength={NAME_MAX}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => blur("lastName")}
                    borderColor={getError("lastName") ? "red.400" : undefined}
                    disabled={loading}
                  />
                  {getError("lastName") && (
                    <Text fontSize="12px" color="status.error" mt={1}>
                      {getError("lastName")}
                    </Text>
                  )}
                </Box>
              </Flex>

              <Box>
                <Text {...labelStyle}>{t("signup.email")}</Text>
                <Input
                  {...inputStyle}
                  type="email"
                  placeholder={t("signup.email_placeholder")}
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
                <Text {...labelStyle}>{t("signup.password")}</Text>
                <Input
                  {...inputStyle}
                  type="password"
                  placeholder={t("signup.password_placeholder")}
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

              <Box>
                <Text {...labelStyle}>{t("signup.confirm_password")}</Text>
                <Input
                  {...inputStyle}
                  type="password"
                  placeholder={t("signup.confirm_password_placeholder")}
                  value={confirmPassword}
                  maxLength={PASS_MAX}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => blur("confirmPassword")}
                  borderColor={
                    getError("confirmPassword") ? "red.400" : undefined
                  }
                  disabled={loading}
                />
                {getError("confirmPassword") && (
                  <Text fontSize="12px" color="status.error" mt={1}>
                    {getError("confirmPassword")}
                  </Text>
                )}
              </Box>

              <Flex align="center" gap={2}>
                <Checkbox.Root
                  checked={agreeTerms}
                  onCheckedChange={(e) => {
                    setAgreeTerms(!!e.checked);
                    if (e.checked) setShowTermsInfo(false);
                  }}
                  colorPalette="purple"
                  size="sm"
                  disabled={loading}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control
                    borderColor={
                      submitted && !agreeTerms ? "red.400" : "border.control"
                    }
                    borderRadius="4px"
                    _checked={{
                      bg: "brand.purple",
                      borderColor: "brand.purple",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label
                    fontSize="13px"
                    color={
                      submitted && !agreeTerms
                        ? "status.error"
                        : "text.secondary"
                    }
                  >
                    {t("signup.agree_terms")}
                  </Checkbox.Label>
                </Checkbox.Root>
                <TermsInfo
                  show={showTermsInfo}
                  onClose={() => setShowTermsInfo(false)}
                />
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
                {loading ? t("signup.signup_loading") : t("signup.submit")}
              </Button>

              <Flex justify="center" gap={1} mt={2}>
                <Text fontSize="14px" color="text.secondary">
                  {t("signup.have_account")}
                </Text>
                <Link to="/login">
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                    color="brand.purple"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {t("signup.log_in_link")}
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

export default SignupComponent;
