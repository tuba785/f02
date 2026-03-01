import { Box, Grid, VStack, Text } from "@chakra-ui/react";
import { FaUsers, FaBook, FaStore, FaFeather } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface StatisticItem {
  icon: React.ReactNode;
  number: string;
  labelKey: string;
}

const StatisticsField = () => {
  const { t } = useTranslation();

  const statistics: StatisticItem[] = [
    {
      icon: <FaUsers size={80} />,
      number: "125,663",
      labelKey: "statistics.happy_customers",
    },
    {
      icon: <FaBook size={80} />,
      number: "50,672+",
      labelKey: "statistics.book_collections",
    },
    {
      icon: <FaStore size={80} />,
      number: "1,562",
      labelKey: "statistics.our_stores",
    },
    {
      icon: <FaFeather size={80} />,
      number: "457",
      labelKey: "statistics.famous_writers",
    },
  ];

  return (
    <Box w="100%" h="400px" display="flex" alignItems="center" px={8}>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={10}
        w="100%"
        maxW="1400px"
        mx="auto"
      >
        {statistics.map((stat, index) => (
          <VStack key={index} gap={5} textAlign="center">
            <Box color="brand.purple">{stat.icon}</Box>
            <Text fontSize="60px" fontWeight={700} color="text.heading">
              {stat.number}
            </Text>
            <Text fontSize="14px" color="text.placeholder">
              {t(stat.labelKey)}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsField;
