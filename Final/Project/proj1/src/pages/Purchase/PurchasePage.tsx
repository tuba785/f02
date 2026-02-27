import { VStack } from "@chakra-ui/react";
import Footer from "../../components/layout/Footer/Footer";
import Header from "../../components/layout/Header/Header";
import PAll from "../../components/layout/OnlyPurchase/PAll";

const PurchasePage = () => {
  return (
    <>
      <Header />
      <VStack gap={12} align="center" py={10}>
        <PAll />
      </VStack>
      <Footer />
    </>
  );
};

export default PurchasePage;
