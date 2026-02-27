import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import PStepper, { type PStep } from "./PStepper";
import PurchaseMerged from "./PurchaseMerged";
import ComingSoon from "../../common/ComingSoon/ComingSoon";

const PAll = () => {
  const [step, setStep] = useState<PStep>("Shopping Summary");

  return (
    <VStack gap={10} align="center" w="full" py={8}>
      <PStepper defaultStep={step} onChange={setStep} />

      {step === "Shopping Summary" ? <PurchaseMerged /> : <ComingSoon />}
    </VStack>
  );
};

export default PAll;
