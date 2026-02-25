import {
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { PRIMARY_PURPLE } from "../../../styles/colors";

const LanguageSelect = () => {
  return (
    <NativeSelectRoot
      w="78px"
      h="44px"
      borderRadius="14px"
      border="none"
      bg="#f0f0f0"
      color="gray.700"
      fontWeight="600"
    >
      <NativeSelectField
        defaultValue="EN"
        h="44px"
        px="10px"
        border="none"
        _focusVisible={{ boxShadow: "none", outline: "none" }}
      >
        <option value="EN">EN</option>
        <option value="AZ">AZ</option>
        <option value="RU">RU</option>
      </NativeSelectField>
      <NativeSelectIndicator color={PRIMARY_PURPLE}>
        <FiChevronDown />
      </NativeSelectIndicator>
    </NativeSelectRoot>
  );
};

export default LanguageSelect;
