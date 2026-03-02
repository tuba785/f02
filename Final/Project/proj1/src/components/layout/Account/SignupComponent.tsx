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
import TermsInfo from "../MiniModals/TermsInfo";
import SignUpImg from "../../../assets/images/SignUp.png";

const NAME_MAX = 30;
const EMAIL_MAX = 50;
const PASS_MAX = 30;
const PASS_MIN = 6;

const SignupComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  const blur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const getError = (
    field: "firstName" | "lastName" | "email" | "password" | "confirmPassword",
  ) => {
    const show = touched[field] || submitted;
    if (!show) return null;

    if (field === "firstName") {
      if (!firstName.trim()) return t("signup.required");
      if (firstName.length > NAME_MAX)
        return t("signup.max_chars", { count: NAME_MAX });
    }

    if (field === "lastName") {
      if (!lastName.trim()) return t("signup.required");
      if (lastName.length > NAME_MAX)
        return t("signup.max_chars", { count: NAME_MAX });
    }

    if (field === "email") {
      if (!email.trim()) return t("signup.required");
      if (email.length > EMAIL_MAX)
        return t("signup.max_chars", { count: EMAIL_MAX });
      if (!email.includes("@")) return t("signup.invalid_email");
    }

    if (field === "password") {
      if (!password.trim()) return t("signup.required");
      if (password.length < PASS_MIN)
        return t("signup.min_chars", { count: PASS_MIN });
      if (password.length > PASS_MAX)
        return t("signup.max_chars", { count: PASS_MAX });
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
      lastName.trim() &&
      email.trim() &&
      email.includes("@") &&
      password.trim() &&
      password.length >= PASS_MIN &&
      confirmPassword === password &&
      agreeTerms
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!agreeTerms) {
      setShowTermsInfo(true);
    }

    if (!isValid()) return;

    dispatch(login());
    navigate("/");
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
                mt={2}
              >
                {t("signup.submit")}
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
