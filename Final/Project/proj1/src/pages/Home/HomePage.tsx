import { VStack } from "@chakra-ui/react";
import BookOnSale from "../../components/common/BookOnSale/BookOnSale";
import Features1 from "../../components/common/Features/Features1";
import SubscriptionEmail from "../../components/common/SubscriptionEmail/SubscriptionEmail";
import Footer from "../../components/layout/Footer/Footer";
import Header from "../../components/layout/Header/Header";
import Banner1Merged from "../../components/layout/OnlyMain/BannerContent1/Banner1Merged";
import BannerCon2A3 from "../../components/layout/OnlyMain/BannerContent2/BannerCon2A3";
import { BannerContent4 } from "../../components/layout/OnlyMain/BannerContent4/BannerContent4";
import FreshSale from "../../components/layout/OnlyMain/FreshSale/FreshSale";
import NBL from "../../components/layout/OnlyMain/NBLatestNews/NBL";
import NBT from "../../components/layout/OnlyMain/NBTestimonals/NBT";
import SpecialOffers from "../../components/layout/OnlyMain/SpecialOffers/SpecialOffers";
import StatisticsField from "../../components/layout/OnlyMain/StatisticsField/StatisticsField";

const HomePage = () => {
  return (
    <>
      <Header />
      <VStack gap={12} align="center" py={10}>
        <Banner1Merged />
        <Features1 />
        <BannerCon2A3 />
        <SpecialOffers />
        <FreshSale />
        <BookOnSale />
        <BannerContent4 />
        <NBT />
        <NBL />
        <StatisticsField />
        <SubscriptionEmail />
      </VStack>
      <Footer />
    </>
  );
};

export default HomePage;
