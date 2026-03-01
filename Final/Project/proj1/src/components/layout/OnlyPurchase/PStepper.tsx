import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export type PStep = "Shopping Summary" | "Checkout" | "Payment" | "Shipping";

const STEPS: PStep[] = ["Shopping Summary", "Checkout", "Payment", "Shipping"];

interface PStepperProps {
  defaultStep?: PStep;
  onChange?: (step: PStep) => void;
}

const PStepper = ({
  defaultStep = "Shopping Summary",
  onChange,
}: PStepperProps) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<PStep>(defaultStep);

  const handleSelect = (step: PStep) => {
    setActiveStep(step);
    onChange?.(step);
  };

  return (
    <Flex align="flex-start" justify="center" width="100%">
      {STEPS.map((label, index) => {
        const isActive = label === activeStep;
        const isLast = index === STEPS.length - 1;
        const stepKeys: Record<PStep, string> = {
          "Shopping Summary": "stepper.shopping_summary",
          Checkout: "stepper.checkout",
          Payment: "stepper.payment",
          Shipping: "stepper.shipping",
        };

        return (
          <Flex key={label} align="flex-start">
            <Flex
              direction="column"
              align="center"
              gap="8px"
              cursor="pointer"
              onClick={() => handleSelect(label)}
              role="button"
              aria-pressed={isActive}
            >
              <Box
                width="32px"
                height="32px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                bg={isActive ? "brand.purple" : "text.tertiary"}
                transition="background 0.2s"
              >
                {isActive && (
                  <Box color="text.onBrand" display="flex">
                    <FaCheck size={13} />
                  </Box>
                )}
              </Box>

              <Text
                fontSize="12px"
                fontWeight={isActive ? "600" : "400"}
                color={isActive ? "text.heading" : "text.placeholder"}
                whiteSpace="nowrap"
                textAlign="center"
                transition="color 0.2s"
              >
                {t(stepKeys[label])}
              </Text>
            </Flex>

            {!isLast && (
              <Box
                height="2px"
                width="120px"
                bg="status.stepperTrack"
                mt="15px"
                flexShrink={0}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default PStepper;
