import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../styles/colors";

const ONE_SECOND_MS = 1000;
const ONE_MINUTE_SECONDS = 60;
const ONE_HOUR_SECONDS = 60 * ONE_MINUTE_SECONDS;
const ONE_DAY_SECONDS = 24 * ONE_HOUR_SECONDS;

const MAX_SECONDS =
  2 * ONE_DAY_SECONDS + 10 * ONE_HOUR_SECONDS + 59 * ONE_MINUTE_SECONDS + 59;
const MIN_SECONDS =
  2 * ONE_DAY_SECONDS + 5 * ONE_HOUR_SECONDS + 59 * ONE_MINUTE_SECONDS + 59;

// Full phase from max to min inclusive, then immediately restart from max.
const CYCLE_SECONDS = MAX_SECONDS - MIN_SECONDS + 1;

// Fixed UTC anchor keeps the timer deterministic across reloads.
const ANCHOR_UTC_MS = Date.UTC(2026, 2, 21, 0, 0, 0);

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getRemainingSeconds = (nowMs: number) => {
  const elapsedSeconds = Math.floor((nowMs - ANCHOR_UTC_MS) / ONE_SECOND_MS);
  const phase =
    ((elapsedSeconds % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS;
  return MAX_SECONDS - phase;
};

const splitToTimeParts = (totalSeconds: number): TimeParts => {
  const days = Math.floor(totalSeconds / ONE_DAY_SECONDS);
  const hours = Math.floor((totalSeconds % ONE_DAY_SECONDS) / ONE_HOUR_SECONDS);
  const minutes = Math.floor(
    (totalSeconds % ONE_HOUR_SECONDS) / ONE_MINUTE_SECONDS,
  );
  const seconds = totalSeconds % ONE_MINUTE_SECONDS;

  return { days, hours, minutes, seconds };
};

const pad2 = (value: number) => value.toString().padStart(2, "0");

const TimeForSale = () => {
  const { t } = useTranslation();
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNowMs(Date.now());
    }, ONE_SECOND_MS);

    return () => window.clearInterval(timerId);
  }, []);

  const time = useMemo(() => {
    const remaining = getRemainingSeconds(nowMs);
    return splitToTimeParts(remaining);
  }, [nowMs]);

  return (
    <Box
      border="1px solid"
      borderColor="border.default"
      borderRadius="lg"
      px={{ base: 6, md: 10 }}
      py={4}
    >
      <HStack gap={{ base: 4, md: 8 }}>
        <VStack gap={1} w="60px">
          <Text fontSize="4xl" fontWeight="bold" color={colors.primary.orange}>
            {pad2(time.days)}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {t("fresh_sale.day")}
          </Text>
        </VStack>

        <VStack gap={1} w="60px">
          <Text fontSize="4xl" fontWeight="bold" color={colors.primary.orange}>
            {pad2(time.hours)}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {t("fresh_sale.hours")}
          </Text>
        </VStack>

        <VStack gap={1} w="60px">
          <Text fontSize="4xl" fontWeight="bold" color={colors.primary.orange}>
            {pad2(time.minutes)}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {t("fresh_sale.minutes")}
          </Text>
        </VStack>

        <VStack gap={1} w="60px">
          <Text fontSize="4xl" fontWeight="bold" color={colors.primary.orange}>
            {pad2(time.seconds)}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {t("fresh_sale.second")}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TimeForSale;
