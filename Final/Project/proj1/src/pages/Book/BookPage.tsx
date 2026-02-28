import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "../../components/layout/Header/Header";
import Book from "../../components/layout/OnlyBook/Book";
import Features2 from "../../components/common/Features/Features2";
import BookOnSale from "../../components/common/BookOnSale/BookOnSale";
import Brands from "../../components/common/Brands/Brands";
import SubscriptionEmail from "../../components/common/SubscriptionEmail/SubscriptionEmail";
import Footer from "../../components/layout/Footer/Footer";

const BookPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex direction="column" gap={70} py={8} px={6} flex={1}>
        <Book bookId={id} />
        <Features2 />
        <BookOnSale />
        <Brands />
        <SubscriptionEmail />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default BookPage;
