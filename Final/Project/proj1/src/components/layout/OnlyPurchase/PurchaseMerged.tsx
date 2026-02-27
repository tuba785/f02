import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import PurchaseForm1, { type BuyerInfoData } from "./PurchaseForm1";
import PurchaseForm2, { type PaymentData } from "./PurchaseForm2";
import PurchaseModal from "../Modals/PurchaseModal";

const initialBuyer: BuyerInfoData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  postcode: "",
  city: "",
  note: "",
};

const initialPayment: PaymentData = {
  method: "card",
  nameOnCard: "",
  cardNumber: "",
  cvv: "",
  month: "",
  year: "",
};

const PurchaseMerged = () => {
  const [buyer, setBuyer] = useState<BuyerInfoData>(initialBuyer);
  const [payment, setPayment] = useState<PaymentData>(initialPayment);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const validate = (): boolean => {
    const buyerOk =
      buyer.firstName.trim() !== "" &&
      buyer.lastName.trim() !== "" &&
      buyer.email.trim() !== "" &&
      buyer.email.includes("@") &&
      buyer.phone.trim() !== "" &&
      buyer.address.trim() !== "" &&
      buyer.state.trim() !== "" &&
      buyer.postcode.trim() !== "" &&
      buyer.city.trim() !== "";

    const paymentOk =
      payment.nameOnCard.trim() !== "" &&
      payment.cardNumber.trim() !== "" &&
      payment.cvv.trim() !== "" &&
      payment.month.trim() !== "" &&
      payment.year.trim() !== "";

    const buyerFields = [
      buyer.firstName,
      buyer.lastName,
      buyer.email,
      buyer.phone,
      buyer.address,
      buyer.postcode,
      buyer.city,
    ];
    const paymentFields = [payment.nameOnCard, payment.cardNumber, payment.cvv];
    const allUnder20 = [...buyerFields, ...paymentFields].every(
      (v) => v.length <= 20,
    );

    return buyerOk && paymentOk && allUnder20;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (validate()) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Flex
        gap={16}
        align="flex-start"
        justify="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <PurchaseForm1 data={buyer} onChange={setBuyer} submitted={submitted} />
        <PurchaseForm2
          data={payment}
          onChange={setPayment}
          submitted={submitted}
          onSubmit={handleSubmit}
        />
      </Flex>

      <PurchaseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default PurchaseMerged;
