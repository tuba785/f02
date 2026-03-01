import {
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const langMap: Record<string, string> = { en: "EN", az: "AZ", ru: "RU" };
const codemap: Record<string, string> = { EN: "en", AZ: "az", RU: "ru" };

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = codemap[e.target.value];
    if (code) i18n.changeLanguage(code);
  };

  return (
    <NativeSelectRoot
      w="78px"
      h="44px"
      borderRadius="14px"
      border="none"
      bg="bg.subtle"
      color="text.primary"
      fontWeight="600"
    >
      <NativeSelectField
        value={langMap[i18n.language] ?? "EN"}
        onChange={handleChange}
        h="44px"
        px="10px"
        border="none"
        _focusVisible={{ boxShadow: "none", outline: "none" }}
      >
        <option value="EN">EN</option>
        <option value="AZ">AZ</option>
        <option value="RU">RU</option>
      </NativeSelectField>
      <NativeSelectIndicator color="brand.purple">
        <FiChevronDown />
      </NativeSelectIndicator>
    </NativeSelectRoot>
  );
};

export default LanguageSelect;
