import { Flex, Text } from "@chakra-ui/react";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const ComingSoon = () => {
  return (
    <Flex direction="column" align="center" justify="center" py={16} gap={2}>
      <Text
        fontSize="48px"
        fontWeight="800"
        color={PRIMARY_PURPLE}
        letterSpacing="-1px"
      >
        Coming Soon
      </Text>
      <Text fontSize="15px" color="#9ca3af">
        This section is under construction. Stay tuned!
      </Text>
    </Flex>
  );
};

export default ComingSoon;
