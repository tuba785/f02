import { Flex } from "@chakra-ui/react";
import Header from "../../components/layout/Header/Header";
import Books from "../../components/layout/OnlyBooks/Books";
import BookOnSale from "../../components/common/BookOnSale/BookOnSale";
import Features1 from "../../components/common/Features/Features1";
import SubscriptionEmail from "../../components/common/SubscriptionEmail/SubscriptionEmail";
import Footer from "../../components/layout/Footer/Footer";

const BooksPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex direction="column" gap={10} py={8} px={6} flex={1}>
        <Books />
        <BookOnSale />
        <Features1 />
        <SubscriptionEmail />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default BooksPage;
