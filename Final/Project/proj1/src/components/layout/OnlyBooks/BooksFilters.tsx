import { useEffect, useState } from "react";
import { Box, Flex, Text, Grid, Input, Slider } from "@chakra-ui/react";
import { FiChevronUp, FiChevronDown, FiCheck } from "react-icons/fi";

const YEARS_INITIAL = 16;

const GENRES = [
  "Biography",
  "Fantasy",
  "Historical",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Self-help",
  "Thriller",
  "Young-adult",
];

const FORMATS = ["Audiobook", "E-book", "Hardcover", "Paperback"];

const LANGUAGES = [
  "Arabic",
  "Azerbaijani",
  "Chinese",
  "English",
  "French",
  "German",
  "Hindi",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Spanish",
  "Turkish",
];

const YEARS = [
  "2024",
  "2022",
  "2021",
  "2016",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2007",
  "2006",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1989",
  "1986",
  "1985",
  "1984",
  "1979",
  "1976",
  "1972",
  "1971",
  "1970",
  "1969",
  "1968",
  "1967",
  "1966",
  "1965",
  "1960",
  "1958",
  "1957",
  "1956",
  "1954",
  "1952",
  "1951",
  "1948",
  "1947",
  "1946",
  "1945",
  "1943",
  "1942",
  "1939",
  "1936",
  "1935",
  "1933",
  "1930",
  "1929",
  "1927",
  "1926",
  "1924",
  "1923",
  "1920",
  "1915",
  "1913",
  "1912",
  "1910",
  "1908",
  "1907",
  "1902",
  "1900",
];

const EDITOR_PICKS = [
  { key: "bestsellers", label: "Bestsellers" },
  { key: "discounted", label: "Has Discount" },
  { key: "most_likes", label: "Most Likes (Top 10)" },
  { key: "most_comments", label: "Most Comments (Top 10)" },
] as const;

type EditorPick = (typeof EDITOR_PICKS)[number]["key"] | null;

const PRICE_MIN = 0;
const PRICE_MAX = 100;

export interface FiltersState {
  genres: string[];
  editorPick: EditorPick;
  formats: string[];
  languages: string[];
  years: string[];
  priceMin: number;
  priceMax: number;
}

const defaultFilters: FiltersState = {
  genres: [],
  editorPick: null,
  formats: [],
  languages: [],
  years: [],
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
};

interface SectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Section = ({ title, open, onToggle, children }: SectionProps) => (
  <Box
    borderBottom="1px solid"
    borderBottomColor="border.default"
    pb={4}
    mb={4}
  >
    <Flex
      align="center"
      justify="space-between"
      cursor="pointer"
      onClick={onToggle}
      userSelect="none"
      py={2}
    >
      <Text fontSize="15px" fontWeight="700" color="text.heading">
        {title}
      </Text>
      {open ? (
        <FiChevronUp size={18} color="var(--chakra-colors-text-muted)" />
      ) : (
        <FiChevronDown size={18} color="var(--chakra-colors-text-muted)" />
      )}
    </Flex>
    {open && <Box mt={2}>{children}</Box>}
  </Box>
);

interface CheckboxItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const CheckboxItem = ({ label, active, onClick }: CheckboxItemProps) => (
  <Flex
    align="center"
    gap={2}
    cursor="pointer"
    onClick={onClick}
    py={1}
    userSelect="none"
    _hover={{ bg: "brand.lightPurple" }}
    px={1}
    borderRadius="6px"
    transition="background 0.15s"
  >
    <Flex
      align="center"
      justify="center"
      w="18px"
      h="18px"
      borderRadius="4px"
      border="2px solid"
      borderColor={active ? "brand.purple" : "border.default"}
      bg={active ? "brand.purple" : "bg.surface"}
      transition="all 0.15s"
      flexShrink={0}
    >
      {active && (
        <FiCheck size={12} color="var(--chakra-colors-text-onBrand)" />
      )}
    </Flex>
    <Text
      fontSize="13px"
      fontWeight="500"
      color={active ? "brand.purple" : "text.heading"}
    >
      {label}
    </Text>
  </Flex>
);

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Chip = ({ label, active, onClick }: ChipProps) => (
  <Flex
    align="center"
    justify="center"
    px={3}
    h="32px"
    borderRadius="8px"
    border="1.5px solid"
    borderColor={active ? "brand.purple" : "border.default"}
    bg={active ? "brand.lightPurple" : "bg.surface"}
    color={active ? "brand.purple" : "text.heading"}
    fontSize="13px"
    fontWeight="600"
    cursor="pointer"
    transition="all 0.15s"
    userSelect="none"
    _hover={{
      bg: "brand.lightPurple",
      borderColor: "brand.purple",
      color: "brand.purple",
    }}
    onClick={onClick}
  >
    {label}
  </Flex>
);

interface RadioItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const RadioItem = ({ label, active, onClick }: RadioItemProps) => (
  <Flex
    align="center"
    gap={2}
    cursor="pointer"
    onClick={onClick}
    py={1}
    userSelect="none"
  >
    <Flex
      align="center"
      justify="center"
      w="18px"
      h="18px"
      borderRadius="full"
      border="2px solid"
      borderColor={active ? "brand.purple" : "border.default"}
      transition="border-color 0.15s"
    >
      {active && <Box w="9px" h="9px" borderRadius="full" bg="brand.purple" />}
    </Flex>
    <Text
      fontSize="13px"
      fontWeight={active ? "600" : "400"}
      color={active ? "brand.purple" : "text.heading"}
    >
      {label}
    </Text>
  </Flex>
);

interface BooksFiltersProps {
  onChange?: (filters: FiltersState) => void;
  onReset?: () => void;
  initialGenres?: string[];
}

const BooksFilters = ({
  onChange,
  onReset,
  initialGenres = [],
}: BooksFiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    ...defaultFilters,
    genres: initialGenres,
  });
  const [showAllYears, setShowAllYears] = useState(false);

  const [openSections, setOpenSections] = useState({
    genres: true,
    editorPicks: true,
    formats: false,
    languages: false,
    years: false,
    price: true,
  });

  useEffect(() => {
    if (initialGenres.length > 0) {
      onChange?.({ ...defaultFilters, genres: initialGenres });
    }
  }, []);

  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((p) => ({ ...p, [section]: !p[section] }));

  const toggleArrayItem = (
    field: "genres" | "formats" | "languages" | "years",
    value: string,
  ) => {
    setFilters((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handlePriceSlider = (details: { value: number[] }) => {
    const [lo, hi] = details.value;
    setFilters((p) => ({ ...p, priceMin: lo, priceMax: hi }));
  };

  const handlePriceInput = (edge: "priceMin" | "priceMax", raw: string) => {
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    const clamped = Math.max(PRICE_MIN, Math.min(PRICE_MAX, num));
    setFilters((p) => {
      if (edge === "priceMin") {
        return { ...p, priceMin: Math.min(clamped, p.priceMax) };
      }
      return { ...p, priceMax: Math.max(clamped, p.priceMin) };
    });
  };

  const applyFilters = () => {
    onChange?.(filters);
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
    onReset?.();
  };

  return (
    <Box
      w="260px"
      bg="bg.surface"
      borderRadius="16px"
      border="1px solid"
      borderColor="border.default"
      p={5}
      flexShrink={0}
    >
      <Section
        title="Editor Picks"
        open={openSections.editorPicks}
        onToggle={() => toggle("editorPicks")}
      >
        <Flex direction="column" gap={1}>
          {EDITOR_PICKS.map((item) => (
            <RadioItem
              key={item.key}
              label={item.label}
              active={filters.editorPick === item.key}
              onClick={() =>
                setFilters((p) => ({
                  ...p,
                  editorPick: p.editorPick === item.key ? null : item.key,
                }))
              }
            />
          ))}
        </Flex>
      </Section>

      <Section
        title="Shop by Category"
        open={openSections.genres}
        onToggle={() => toggle("genres")}
      >
        <Grid templateColumns="1fr 1fr" gap={0}>
          {GENRES.map((g) => (
            <CheckboxItem
              key={g}
              label={g}
              active={filters.genres.includes(g)}
              onClick={() => toggleArrayItem("genres", g)}
            />
          ))}
        </Grid>
      </Section>

      <Section
        title="Choose Format"
        open={openSections.formats}
        onToggle={() => toggle("formats")}
      >
        <Grid templateColumns="1fr 1fr" gap={2}>
          {FORMATS.map((f) => (
            <Chip
              key={f}
              label={f}
              active={filters.formats.includes(f)}
              onClick={() => toggleArrayItem("formats", f)}
            />
          ))}
        </Grid>
      </Section>

      <Section
        title="Choose Language"
        open={openSections.languages}
        onToggle={() => toggle("languages")}
      >
        <Grid templateColumns="1fr 1fr" gap={2}>
          {LANGUAGES.map((l) => (
            <Chip
              key={l}
              label={l}
              active={filters.languages.includes(l)}
              onClick={() => toggleArrayItem("languages", l)}
            />
          ))}
        </Grid>
      </Section>

      <Section
        title="Select Year"
        open={openSections.years}
        onToggle={() => toggle("years")}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {(showAllYears ? YEARS : YEARS.slice(0, YEARS_INITIAL)).map((y) => (
            <Chip
              key={y}
              label={y}
              active={filters.years.includes(y)}
              onClick={() => toggleArrayItem("years", y)}
            />
          ))}
        </Grid>
        {YEARS.length > YEARS_INITIAL && (
          <Text
            mt={2}
            fontSize="13px"
            fontWeight="600"
            color="brand.purple"
            cursor="pointer"
            textAlign="center"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setShowAllYears((p) => !p)}
          >
            {showAllYears ? "View less ▲" : "View more ▼"}
          </Text>
        )}
      </Section>

      <Section
        title="Price Range"
        open={openSections.price}
        onToggle={() => toggle("price")}
      >
        <Box px={1}>
          <Slider.Root
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={1}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={handlePriceSlider}
          >
            <Slider.Control>
              <Slider.Track h="6px" bg="border.default" borderRadius="3px">
                <Slider.Range bg="brand.purple" borderRadius="3px" />
              </Slider.Track>
              <Slider.Thumb
                index={0}
                w="18px"
                h="18px"
                bg="bg.surface"
                border="3px solid"
                borderColor="brand.purple"
                borderRadius="full"
                boxShadow="sm"
              />
              <Slider.Thumb
                index={1}
                w="18px"
                h="18px"
                bg="bg.surface"
                border="3px solid"
                borderColor="brand.purple"
                borderRadius="full"
                boxShadow="sm"
              />
            </Slider.Control>
          </Slider.Root>

          <Flex mt={3} gap={3} align="center">
            <Input
              size="sm"
              w="80px"
              textAlign="center"
              borderRadius="8px"
              border="1.5px solid"
              borderColor="border.default"
              fontWeight="600"
              fontSize="13px"
              value={`$${filters.priceMin}`}
              onChange={(e) =>
                handlePriceInput("priceMin", e.target.value.replace("$", ""))
              }
            />
            <Box w="12px" h="2px" bg="border.default" borderRadius="1px" />
            <Input
              size="sm"
              w="80px"
              textAlign="center"
              borderRadius="8px"
              border="1.5px solid"
              borderColor="border.default"
              fontWeight="600"
              fontSize="13px"
              value={`$${filters.priceMax}`}
              onChange={(e) =>
                handlePriceInput("priceMax", e.target.value.replace("$", ""))
              }
            />
          </Flex>
        </Box>
      </Section>

      <Flex direction="column" gap={2} mt={2}>
        <Flex
          as="button"
          align="center"
          justify="center"
          h="44px"
          bg="brand.purple"
          color="text.onBrand"
          borderRadius="10px"
          fontWeight="700"
          fontSize="14px"
          cursor="pointer"
          transition="opacity 0.15s"
          _hover={{ opacity: 0.85 }}
          onClick={applyFilters}
        >
          Refine Search
        </Flex>
        <Flex
          as="button"
          align="center"
          justify="center"
          h="36px"
          bg="transparent"
          color="text.muted"
          fontWeight="600"
          fontSize="13px"
          cursor="pointer"
          _hover={{ color: "text.heading" }}
          onClick={resetFilters}
        >
          Reset Filter
        </Flex>
      </Flex>
    </Box>
  );
};

export default BooksFilters;
