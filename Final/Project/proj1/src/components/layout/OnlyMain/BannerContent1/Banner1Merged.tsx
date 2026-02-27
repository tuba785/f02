import { Flex } from "@chakra-ui/react";
import { BannerContent1 } from "./BannerContent1";
import MiniSliderInBanner from "./MiniSliderInBanner";

const GAP = 16;

const Banner1Merged = () => {
  return (
    <Flex
      width="1620px"
      height="662px"
      mx="auto"
      gap={`${GAP}px`}
      align="stretch"
    >
      <BannerContent1 width="1220px" />

      <MiniSliderInBanner />
    </Flex>
  );
};

export default Banner1Merged;
