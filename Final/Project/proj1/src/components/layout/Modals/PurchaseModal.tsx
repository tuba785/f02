import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "@chakra-ui/react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal = ({ isOpen, onClose }: PurchaseModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goHome = () => {
    onClose();
    navigate("/");
  };

  const goPurchase = () => {
    onClose();
    navigate("/purchase");
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
    >
      <DialogBackdrop
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={1200}
      />

      <DialogContent
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="bg.surface"
        zIndex={1300}
        maxW="460px"
        w="90%"
        borderRadius="16px"
        p={8}
      >
        <DialogCloseTrigger />

        <DialogBody p={0}>
          <Flex direction="column" align="center" gap={5} textAlign="center">
            <Box
              w="72px"
              h="72px"
              borderRadius="full"
              bg="brand.purpleFaint"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaCheck size={30} color="var(--chakra-colors-brand-purple)" />
            </Box>

            <Text fontSize="22px" fontWeight="800" color="text.heading">
              {t("purchase_modal.success_title")}
            </Text>

            <Text fontSize="14px" color="text.placeholder" maxW="320px">
              {t("purchase_modal.success_description")}
            </Text>

            <Flex direction="column" gap={3} w="full" mt={2}>
              <Button
                bg="brand.purple"
                color="text.onBrand"
                w="full"
                py={6}
                fontSize="15px"
                fontWeight="600"
                borderRadius="10px"
                _hover={{ opacity: 0.85 }}
                onClick={goHome}
              >
                {t("purchase_modal.back_to_home")}
              </Button>
              <Button
                bg="transparent"
                color="text.heading"
                border="2px solid"
                borderColor="border.input"
                w="full"
                py={6}
                fontSize="15px"
                fontWeight="600"
                borderRadius="10px"
                _hover={{ borderColor: "brand.purple", color: "brand.purple" }}
                onClick={goPurchase}
              >
                {t("purchase_modal.back_to_purchase")}
              </Button>
            </Flex>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default PurchaseModal;
