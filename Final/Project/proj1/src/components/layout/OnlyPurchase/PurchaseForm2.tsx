import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { FaExchangeAlt, FaCreditCard, FaPaypal } from "react-icons/fa";
import CVVInfo from "../MiniModals/CVVInfo";

const MAX_LEN = 20;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = ["2026", "2027", "2028", "2029", "2030"];

type PaymentMethod = "bank" | "card" | "paypal";

export interface PaymentData {
  method: PaymentMethod;
  nameOnCard: string;
  cardNumber: string;
  cvv: string;
  month: string;
  year: string;
}

interface PurchaseForm2Props {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  submitted: boolean;
  onSubmit: () => void;
}

const methods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "bank", label: "Bank Transfer", icon: <FaExchangeAlt size={28} /> },
  { id: "card", label: "Credit Card", icon: <FaCreditCard size={28} /> },
  { id: "paypal", label: "Paipal", icon: <FaPaypal size={28} /> },
];

const PurchaseForm2 = ({
  data,
  onChange,
  submitted,
  onSubmit,
}: PurchaseForm2Props) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const blur = (field: string) => {
    setTouched((p) => ({ ...p, [field]: true }));
  };

  const err = (field: keyof PaymentData) => {
    const show = touched[field] || submitted;
    if (!show) return null;
    if (!data[field].trim()) return "This field is required";
    if (data[field].length > MAX_LEN) return `Max ${MAX_LEN} characters`;
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
        Payment
      </Text>

      <VStack gap={5} align="stretch">
        <Flex gap={4}>
          {methods.map((m) => {
            const selected = data.method === m.id;
            return (
              <Box
                key={m.id}
                flex={1}
                border="2px solid"
                borderColor={selected ? "brand.purple" : "border.input"}
                borderRadius="12px"
                py={5}
                cursor="pointer"
                position="relative"
                onClick={() => set("method", m.id)}
                transition="all 0.2s"
                _hover={{ borderColor: "brand.purple" }}
              >
                {selected && (
                  <Box
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    w="22px"
                    h="22px"
                    borderRadius="4px"
                    bg="brand.purple"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="text.onBrand"
                    fontSize="12px"
                  >
                    ✓
                  </Box>
                )}
                <Flex direction="column" align="center" gap={2}>
                  <Box color={selected ? "brand.purple" : "text.placeholder"}>
                    {m.icon}
                  </Box>
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    color={selected ? "text.heading" : "text.placeholder"}
                  >
                    {m.label}
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>

        <Box borderTop="2px dashed" borderColor="border.input" my={2} />

        <Box>
          <Text {...labelStyle}>NAME ON CARD</Text>
          <Input
            {...inputStyle}
            placeholder="Enter name on card"
            value={data.nameOnCard}
            maxLength={MAX_LEN}
            onChange={(e) => set("nameOnCard", e.target.value)}
            onBlur={() => blur("nameOnCard")}
            borderColor={err("nameOnCard") ? "red.400" : undefined}
          />
          {err("nameOnCard") && (
            <Text fontSize="12px" color="red.500" mt={1}>
              {err("nameOnCard")}
            </Text>
          )}
        </Box>

        <Flex gap={4}>
          <Box flex={2}>
            <Text {...labelStyle}>CARD NUMBER</Text>
            <Input
              {...inputStyle}
              placeholder="0000 - 0000 - 0000 - 0000"
              value={data.cardNumber}
              maxLength={MAX_LEN}
              onChange={(e) => set("cardNumber", e.target.value)}
              onBlur={() => blur("cardNumber")}
              borderColor={err("cardNumber") ? "red.400" : undefined}
            />
            {err("cardNumber") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("cardNumber")}
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text {...labelStyle}>CVV</Text>
            <Box position="relative">
              <Input
                {...inputStyle}
                placeholder="Enter CVV"
                value={data.cvv}
                maxLength={MAX_LEN}
                onChange={(e) => set("cvv", e.target.value)}
                onBlur={() => blur("cvv")}
                borderColor={err("cvv") ? "red.400" : undefined}
                pr="40px"
              />
              <Box
                position="absolute"
                right="14px"
                top="50%"
                transform="translateY(-50%)"
              >
                <CVVInfo />
              </Box>
            </Box>
            {err("cvv") && (
              <Text fontSize="12px" color="red.500" mt={1}>
                {err("cvv")}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex gap={4}>
          <Box flex={1}>
            <Text {...labelStyle}>MONTH</Text>
            <NativeSelectRoot
              border="1px solid"
              borderColor={
                (touched.month || submitted) && !data.month
                  ? "red.400"
                  : "border.input"
              }
              borderRadius="10px"
              h="48px"
              bg="bg.surface"
            >
              <NativeSelectField
                value={data.month}
                onChange={(e) => {
                  set("month", e.target.value);
                  blur("month");
                }}
                h="48px"
                px="16px"
                fontSize="14px"
                border="none"
                _focusVisible={{ boxShadow: "none", outline: "none" }}
              >
                <option value="" disabled>
                  Select Month
                </option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </NativeSelectField>
              <NativeSelectIndicator color="brand.purple">
                <FiChevronDown />
              </NativeSelectIndicator>
            </NativeSelectRoot>
            {(touched.month || submitted) && !data.month && (
              <Text fontSize="12px" color="red.500" mt={1}>
                This field is required
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text {...labelStyle}>YEAR</Text>
            <NativeSelectRoot
              border="1px solid"
              borderColor={
                (touched.year || submitted) && !data.year
                  ? "red.400"
                  : "border.input"
              }
              borderRadius="10px"
              h="48px"
              bg="bg.surface"
            >
              <NativeSelectField
                value={data.year}
                onChange={(e) => {
                  set("year", e.target.value);
                  blur("year");
                }}
                h="48px"
                px="16px"
                fontSize="14px"
                border="none"
                _focusVisible={{ boxShadow: "none", outline: "none" }}
              >
                <option value="" disabled>
                  Select Year
                </option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </NativeSelectField>
              <NativeSelectIndicator color="brand.purple">
                <FiChevronDown />
              </NativeSelectIndicator>
            </NativeSelectRoot>
            {(touched.year || submitted) && !data.year && (
              <Text fontSize="12px" color="red.500" mt={1}>
                This field is required
              </Text>
            )}
          </Box>
        </Flex>

        <Button
          bg="brand.purple"
          color="text.onBrand"
          w="full"
          h="56px"
          fontSize="16px"
          fontWeight="700"
          borderRadius="12px"
          textTransform="uppercase"
          letterSpacing="1px"
          mt={3}
          _hover={{ opacity: 0.85 }}
          onClick={onSubmit}
        >
          Place Order
        </Button>
      </VStack>
    </Box>
  );
};

export default PurchaseForm2;
