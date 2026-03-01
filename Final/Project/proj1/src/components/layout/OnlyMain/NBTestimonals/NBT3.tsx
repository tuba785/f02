import { Box, Image } from "@chakra-ui/react";

const NBT3 = (props: { seed: string }) => {
  return (
    <Box
      w="50px"
      h="50px"
      bg="bg.skeleton"
      borderRadius="full"
      overflow="hidden"
    >
      <Image
        src={`https://picsum.photos/seed/${props.seed}/50/50`}
        alt="User"
        w="full"
        h="full"
        objectFit="cover"
      />
    </Box>
  );
};

export default NBT3;
