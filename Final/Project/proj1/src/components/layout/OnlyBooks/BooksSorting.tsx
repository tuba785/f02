import { useState } from "react";
import {
  Box,
  Flex,
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { FaList, FaThLarge } from "react-icons/fa";
import { BsSortDown } from "react-icons/bs";
import { PRIMARY_PURPLE } from "../../../styles/colors";

type Era = "all" | "1900-1999" | "2000-now";
type View = "list" | "gallery";

const SORT_OPTIONS = [
  { value: "none", label: "None" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-high", label: "Price: High" },
  { value: "price-low", label: "Price: Low" },
  { value: "rating", label: "Rating" },
  { value: "likes", label: "Likes" },
];

export interface SortingState {
  era: Era;
  view: View;
  sort: string;
}

interface BooksSortingProps {
  onChange?: (state: SortingState) => void;
}

const BooksSorting = ({ onChange }: BooksSortingProps) => {
  const [era, setEra] = useState<Era>("all");
  const [view, setView] = useState<View>("list");
  const [sort, setSort] = useState("none");

  const notify = (next: Partial<SortingState>) => {
    const state = { era, view, sort, ...next };
    onChange?.(state);
  };

  const selectEra = (e: Era) => {
    setEra(e);
    notify({ era: e });
  };

  const selectView = (v: View) => {
    setView(v);
    notify({ view: v });
  };

  const selectSort = (s: string) => {
    setSort(s);
    notify({ sort: s });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      maxW="1200px"
      mx="auto"
      bg="white"
      border="1px solid #e8e8e8"
      borderRadius="12px"
      h="60px"
      px={6}
    >
      <Flex gap={8} align="center" h="full">
        {[
          { value: "all" as Era, label: "All" },
          { value: "1900-1999" as Era, label: "1900-1999" },
          { value: "2000-now" as Era, label: "2000-now" },
        ].map((tab) => (
          <Text
            key={tab.value}
            fontSize="15px"
            fontWeight={era === tab.value ? "700" : "400"}
            color={era === tab.value ? "#11142d" : "#b0b7c3"}
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ color: "#11142d" }}
            onClick={() => selectEra(tab.value)}
          >
            {tab.label}
          </Text>
        ))}
      </Flex>

      <Flex align="center" gap={0} h="full">
        <Flex align="center" gap={3} mr={4}>
          <Box
            cursor="pointer"
            color={view === "list" ? PRIMARY_PURPLE : "#b0b7c3"}
            transition="color 0.15s"
            _hover={{ color: PRIMARY_PURPLE }}
            onClick={() => selectView("list")}
          >
            <FaList size={18} />
          </Box>
          <Box
            cursor="pointer"
            color={view === "gallery" ? PRIMARY_PURPLE : "#b0b7c3"}
            transition="color 0.15s"
            _hover={{ color: PRIMARY_PURPLE }}
            onClick={() => selectView("gallery")}
          >
            <FaThLarge size={18} />
          </Box>
        </Flex>

        <Box w="1px" h="28px" bg="#e8e8e8" />

        <Flex align="center" gap={2} ml={4}>
          <Box color={PRIMARY_PURPLE} display="flex" alignItems="center">
            <BsSortDown size={18} />
          </Box>
          <NativeSelectRoot w="120px" h="36px" border="none" bg="transparent">
            <NativeSelectField
              value={sort}
              onChange={(e) => selectSort(e.target.value)}
              h="36px"
              px="4px"
              fontSize="15px"
              fontWeight="600"
              color="#11142d"
              border="none"
              _focusVisible={{ boxShadow: "none", outline: "none" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </NativeSelectField>
            <NativeSelectIndicator color="#b0b7c3">
              <FiChevronDown />
            </NativeSelectIndicator>
          </NativeSelectRoot>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BooksSorting;
