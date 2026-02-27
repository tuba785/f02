import { Flex } from "@chakra-ui/react";
import { BannerContent2 } from "./BannerContent2";
import { BannerContent3 } from "../BannerContent3/BannerContent3";

const BannerCon2A3 = () => {
  return (
    <Flex width="1606px" height="445px" mx="auto" gap="16px" align="stretch">
      <BannerContent2 />
      <BannerContent3 />
    </Flex>
  );
};

export default BannerCon2A3;
