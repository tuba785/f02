import { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

type Tab = "add" | "edit" | "delete";

const tabs: { id: Tab; label: string }[] = [
  { id: "add", label: "Добавить" },
  { id: "edit", label: "Редактировать" },
  { id: "delete", label: "Удалить" },
];

const Form = () => {
  const isDark = useAppSelector((state) => state.theme.mode) === "dark";
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <Flex direction="column" align="center" py={8} px={4} w="100%">
      {/* Табы */}
      <Flex
        mb={6}
        bg={isDark ? "gray.900" : "gray.100"}
        borderRadius="lg"
        p={1}
        gap={1}
        w="100%"
        maxW="520px"
      >
        {tabs.map((tab) => (
          <Box
            key={tab.id}
            flex={1}
            textAlign="center"
            py={2}
            px={4}
            borderRadius="md"
            cursor="pointer"
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.2s"
            bg={
              activeTab === tab.id
                ? isDark
                  ? "gray.700"
                  : "white"
                : "transparent"
            }
            color={
              activeTab === tab.id
                ? isDark
                  ? "white"
                  : "gray.800"
                : isDark
                  ? "gray.400"
                  : "gray.500"
            }
            boxShadow={
              activeTab === tab.id
                ? isDark
                  ? "0 1px 3px rgba(0,0,0,0.4)"
                  : "sm"
                : "none"
            }
            onClick={() => setActiveTab(tab.id)}
          >
            <Text>{tab.label}</Text>
          </Box>
        ))}
      </Flex>

      {/* Контент */}
      {activeTab === "add" && <AddEmployee />}
      {activeTab === "edit" && <EditEmployee />}
      {activeTab === "delete" && <DeleteEmployee />}
    </Flex>
  );
};

export default Form;
