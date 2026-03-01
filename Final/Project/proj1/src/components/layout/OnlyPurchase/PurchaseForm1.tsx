import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const MAX_LEN = 20;

const STATES = ["England", "US", "Azerbaijan", "Turkey", "Russia", "Other"];

export interface BuyerInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  postcode: string;
  city: string;
  note: string;
}

interface PurchaseForm1Props {
  data: BuyerInfoData;
  onChange: (data: BuyerInfoData) => void;
  submitted: boolean;
}

const PurchaseForm1 = ({ data, onChange, submitted }: PurchaseForm1Props) => {
  const { t } = useTranslation();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (field: keyof BuyerInfoData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const blur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const err = (field: keyof BuyerInfoData, required = true) => {
    const show = touched[field] || submitted;
    if (!show) return null;
    if (required && !data[field].trim()) return t("purchase.required");
    if (field !== "note" && data[field].length > MAX_LEN)
      return t("purchase.max_chars", { count: MAX_LEN });
    if (field === "email" && data[field] && !data[field].includes("@"))
      return t("purchase.invalid_email");
    return null;
  };

  const inputStyle = {
    border: "1px solid",
    borderColor: "border.input",
    borderRadius: "10px",
    h: "48px",
    px: "16px",
    fontSize: "14px",
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
    <Box flex={1}>
      <Text fontSize="28px" fontWeight="800" color="text.heading" mb={6}>
        {t("purchase.buyer_info")}
      </Text>

      <VStack gap={5} align="stretch">
        <Flex gap={4}>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.first_name")}</Text>
            <Input
              {...inputStyle}
              placeholder={t("purchase.enter_first_name")}
              value={data.firstName}
              maxLength={MAX_LEN}
              onChange={(e) => set("firstName", e.target.value)}
              onBlur={() => blur("firstName")}
              borderColor={err("firstName") ? "red.400" : undefined}
            />
            {err("firstName") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("firstName")}
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.last_name")}</Text>
            <Input
              {...inputStyle}
              placeholder={t("purchase.enter_last_name")}
              value={data.lastName}
              maxLength={MAX_LEN}
              onChange={(e) => set("lastName", e.target.value)}
              onBlur={() => blur("lastName")}
              borderColor={err("lastName") ? "red.400" : undefined}
            />
            {err("lastName") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("lastName")}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex gap={4}>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.email_address")}</Text>
            <Input
              {...inputStyle}
              placeholder={t("purchase.email_placeholder")}
              type="email"
              value={data.email}
              maxLength={MAX_LEN}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              borderColor={err("email") ? "red.400" : undefined}
            />
            {err("email") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("email")}
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.phone_number")}</Text>
            <Input
              {...inputStyle}
              placeholder={t("purchase.enter_phone")}
              value={data.phone}
              maxLength={MAX_LEN}
              onChange={(e) => set("phone", e.target.value)}
              onBlur={() => blur("phone")}
              borderColor={err("phone") ? "red.400" : undefined}
            />
            {err("phone") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("phone")}
              </Text>
            )}
          </Box>
        </Flex>

        <Box>
          <Text {...labelStyle}>{t("purchase.address")}</Text>
          <Input
            {...inputStyle}
            placeholder={t("purchase.enter_address")}
            value={data.address}
            maxLength={MAX_LEN}
            onChange={(e) => set("address", e.target.value)}
            onBlur={() => blur("address")}
            borderColor={err("address") ? "red.400" : undefined}
          />
          {err("address") && (
            <Text fontSize="12px" color="red.500" mt={1}>
              {err("address")}
            </Text>
          )}
        </Box>

        <Flex gap={4}>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.state")}</Text>
            <NativeSelectRoot
              border="1px solid"
              borderColor={err("state") ? "red.400" : "border.input"}
              borderRadius="10px"
              h="48px"
              bg="bg.surface"
            >
              <NativeSelectField
                value={data.state}
                onChange={(e) => {
                  set("state", e.target.value);
                  blur("state");
                }}
                h="48px"
                px="16px"
                fontSize="14px"
                border="none"
                _focusVisible={{ boxShadow: "none", outline: "none" }}
              >
                <option value="" disabled>
                  {t("purchase.select_state")}
                </option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </NativeSelectField>
              <NativeSelectIndicator color="brand.purple">
                <FiChevronDown />
              </NativeSelectIndicator>
            </NativeSelectRoot>
            {err("state") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("state")}
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text {...labelStyle}>{t("purchase.postcode")}</Text>
            <Input
              {...inputStyle}
              placeholder={t("purchase.enter_postcode")}
              value={data.postcode}
              maxLength={MAX_LEN}
              onChange={(e) => set("postcode", e.target.value)}
              onBlur={() => blur("postcode")}
              borderColor={err("postcode") ? "red.400" : undefined}
            />
            {err("postcode") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("postcode")}
              </Text>
            )}
          </Box>
        </Flex>

        <Box w="50%">
          <Text {...labelStyle}>{t("purchase.city")}</Text>
          <Input
            {...inputStyle}
            placeholder={t("purchase.enter_city")}
            value={data.city}
            maxLength={MAX_LEN}
            onChange={(e) => set("city", e.target.value)}
            onBlur={() => blur("city")}
            borderColor={err("city") ? "red.400" : undefined}
          />
          {err("city") && (
            <Text fontSize="12px" color="red.500" mt={1}>
              {err("city")}
            </Text>
          )}
        </Box>

        <Box>
          <Text {...labelStyle}>{t("purchase.note")}</Text>
          <Textarea
            border="1px solid"
            borderColor="border.input"
            borderRadius="10px"
            px="16px"
            py="12px"
            fontSize="14px"
            minH="100px"
            placeholder={t("purchase.notes_placeholder")}
            value={data.note}
            onChange={(e) => set("note", e.target.value)}
            _focusVisible={{
              borderColor: "brand.purple",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-purple)",
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default PurchaseForm1;
