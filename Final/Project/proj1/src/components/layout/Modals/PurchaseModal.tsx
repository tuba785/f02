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
import { PRIMARY_PURPLE } from "../../../styles/colors";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal = ({ isOpen, onClose }: PurchaseModalProps) => {
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
        bg="white"
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
              bg={`${PRIMARY_PURPLE}18`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaCheck size={30} color={PRIMARY_PURPLE} />
            </Box>

            <Text fontSize="22px" fontWeight="800" color="#1a202c">
              Purchase Successful!
            </Text>

            <Text fontSize="14px" color="#9ca3af" maxW="320px">
              Your order has been placed successfully. Thank you for your
              purchase!
            </Text>

            <Flex direction="column" gap={3} w="full" mt={2}>
              <Button
                bg={PRIMARY_PURPLE}
                color="white"
                w="full"
                py={6}
                fontSize="15px"
                fontWeight="600"
                borderRadius="10px"
                _hover={{ opacity: 0.85 }}
                onClick={goHome}
              >
                Back to Home
              </Button>
              <Button
                bg="transparent"
                color="#1a202c"
                border="2px solid #e2e8f0"
                w="full"
                py={6}
                fontSize="15px"
                fontWeight="600"
                borderRadius="10px"
                _hover={{ borderColor: PRIMARY_PURPLE, color: PRIMARY_PURPLE }}
                onClick={goPurchase}
              >
                Back to Purchase
              </Button>
            </Flex>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default PurchaseModal;
