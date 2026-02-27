import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { PRIMARY_PURPLE } from "../../../styles/colors";

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
                bg={isActive ? PRIMARY_PURPLE : "#b0b7c3"}
                transition="background 0.2s"
              >
                {isActive && (
                  <Box color="white" display="flex">
                    <FaCheck size={13} />
                  </Box>
                )}
              </Box>

              <Text
                fontSize="12px"
                fontWeight={isActive ? "600" : "400"}
                color={isActive ? "#1a202c" : "#9ca3af"}
                whiteSpace="nowrap"
                textAlign="center"
                transition="color 0.2s"
              >
                {label}
              </Text>
            </Flex>

            {!isLast && (
              <Box
                height="2px"
                width="120px"
                bg="#e5e7eb"
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
