import { Box, Grid, VStack, Text } from "@chakra-ui/react";
import { FaUsers, FaBook, FaStore, FaFeather } from "react-icons/fa";
import { PRIMARY_PURPLE } from "../../../../styles/colors";

interface StatisticItem {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const StatisticsField = () => {
  const statistics: StatisticItem[] = [
    {
      icon: <FaUsers size={80} />,
      number: "125,663",
      label: "Happy Customers",
    },
    {
      icon: <FaBook size={80} />,
      number: "50,672+",
      label: "Book Collections",
    },
    {
      icon: <FaStore size={80} />,
      number: "1,562",
      label: "Our Stores",
    },
    {
      icon: <FaFeather size={80} />,
      number: "457",
      label: "Famous Writers",
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
            <Box color={PRIMARY_PURPLE}>{stat.icon}</Box>
            <Text fontSize="60px" fontWeight={700} color="#1f2937">
              {stat.number}
            </Text>
            <Text fontSize="14px" color="#9ca3af">
              {stat.label}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsField;
