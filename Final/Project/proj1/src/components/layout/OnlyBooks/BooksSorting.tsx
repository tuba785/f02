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
import { useTranslation } from "react-i18next";

type Era = "all" | "1900-1999" | "2000-now";
type View = "list" | "gallery";

const SORT_OPTIONS = [
  { value: "none", labelKey: "sorting.none" },
  { value: "newest", labelKey: "sorting.newest" },
  { value: "oldest", labelKey: "sorting.oldest" },
  { value: "price-high", labelKey: "sorting.price_high" },
  { value: "price-low", labelKey: "sorting.price_low" },
  { value: "rating", labelKey: "sorting.rating" },
  { value: "likes", labelKey: "sorting.likes" },
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
  const { t } = useTranslation();
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
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="12px"
      h="60px"
      px={6}
    >
      <Flex gap={8} align="center" h="full">
        {[
          { value: "all" as Era, label: t("sorting.all") },
          { value: "1900-1999" as Era, label: "1900-1999" },
          { value: "2000-now" as Era, label: "2000-now" },
        ].map((tab) => (
          <Text
            key={tab.value}
            fontSize="15px"
            fontWeight={era === tab.value ? "700" : "400"}
            color={era === tab.value ? "text.heading" : "text.muted"}
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ color: "text.heading" }}
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
            color={view === "list" ? "brand.purple" : "text.muted"}
            transition="color 0.15s"
            _hover={{ color: "brand.purple" }}
            onClick={() => selectView("list")}
          >
            <FaList size={18} />
          </Box>
          <Box
            cursor="pointer"
            color={view === "gallery" ? "brand.purple" : "text.muted"}
            transition="color 0.15s"
            _hover={{ color: "brand.purple" }}
            onClick={() => selectView("gallery")}
          >
            <FaThLarge size={18} />
          </Box>
        </Flex>

        <Box w="1px" h="28px" bg="border.default" />

        <Flex align="center" gap={2} ml={4}>
          <Box color="brand.purple" display="flex" alignItems="center">
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
              color="text.heading"
              border="none"
              _focusVisible={{ boxShadow: "none", outline: "none" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.labelKey)}
                </option>
              ))}
            </NativeSelectField>
            <NativeSelectIndicator color="text.muted">
              <FiChevronDown />
            </NativeSelectIndicator>
          </NativeSelectRoot>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BooksSorting;
