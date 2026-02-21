import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Field,
  NativeSelect,
} from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import ToastNotification from "../../components/ui/ToastNotification";

const departments = {
  "Отдел IT": ["Сис-Админ", "Программист", "Айти-Менеджер"],
  "Операционный Отдел": ["Опер1", "Опер2", "Опер3"],
  "Отдел сервиса": ["СервисДаёт", "СервисЗабирает", "СервисОформляет"],
};

type Department = keyof typeof departments;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  department: "" as Department | "",
  position: "",
  telegramId: "",
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  position: "",
  telegramId: "",
};

const AddEmployee = () => {
  const isDark = useAppSelector((state) => state.theme.mode) === "dark";
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [showToast, setShowToast] = useState(false);

  const positions = formData.department ? departments[formData.department] : [];

  const optionStyle = {
    backgroundColor: isDark ? "#2D3748" : "white",
    color: isDark ? "white" : "black",
  };

  const inputStyles = {
    bg: isDark ? "gray.700" : "gray.50",
    borderColor: isDark ? "gray.600" : "gray.200",
    color: isDark ? "white" : "black",
    _hover: { borderColor: isDark ? "gray.500" : "gray.300" },
    _focus: { borderColor: "blue.400" },
    _placeholder: { color: isDark ? "gray.400" : "gray.400" },
  };

  const errorStyle = {
    color: "red.400",
    fontSize: "xs" as const,
    mt: 1,
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (formData.firstName.length < 2 || formData.firstName.length > 30) {
      newErrors.firstName = "Имя должно быть от 2 до 30 символов";
      isValid = false;
    } else if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(formData.firstName)) {
      newErrors.firstName = "Имя должно содержать только буквы";
      isValid = false;
    }

    if (formData.lastName.length < 2 || formData.lastName.length > 30) {
      newErrors.lastName = "Фамилия должна быть от 2 до 30 символов";
      isValid = false;
    } else if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(formData.lastName)) {
      newErrors.lastName = "Фамилия должна содержать только буквы";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
      isValid = false;
    }

    if (!formData.department) {
      newErrors.department = "Выберите департамент";
      isValid = false;
    }

    if (!formData.position) {
      newErrors.position = "Выберите позицию";
      isValid = false;
    }

    if (!/^\d{8,12}$/.test(formData.telegramId)) {
      newErrors.telegramId = "Введите от 8 до 12 цифр";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      department: e.target.value as Department,
      position: "",
    }));
    setErrors((prev) => ({ ...prev, department: "", position: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Данные формы:", formData);
      setFormData(initialState);
      setErrors(initialErrors);
      setShowToast(true);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit}
        w="100%"
        maxW="520px"
        bg={isDark ? "gray.800" : "white"}
        border="1px solid"
        borderColor={isDark ? "gray.600" : "gray.100"}
        borderRadius="xl"
        boxShadow={
          isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.08)"
        }
        p={8}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={6}
          color={isDark ? "white" : "gray.800"}
        >
          Создание сотрудника
        </Text>

        <VStack gap={4} align="stretch">
          <Field.Root invalid={!!errors.firstName}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Имя
            </Field.Label>
            <Input
              placeholder="Введите имя"
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              {...inputStyles}
            />
            {errors.firstName && (
              <Text {...errorStyle}>{errors.firstName}</Text>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.lastName}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Фамилия
            </Field.Label>
            <Input
              placeholder="Введите фамилию"
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              {...inputStyles}
            />
            {errors.lastName && <Text {...errorStyle}>{errors.lastName}</Text>}
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Почта
            </Field.Label>
            <Input
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              {...inputStyles}
            />
            {errors.email && <Text {...errorStyle}>{errors.email}</Text>}
          </Field.Root>

          <Field.Root invalid={!!errors.department}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Департамент
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={formData.department}
                onChange={handleDepartmentChange}
                {...inputStyles}
              >
                <option value="" style={optionStyle}>
                  Выберите департамент
                </option>
                {Object.keys(departments).map((dep) => (
                  <option key={dep} value={dep} style={optionStyle}>
                    {dep}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.department && (
              <Text {...errorStyle}>{errors.department}</Text>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.position}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Позиция
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={formData.position}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }));
                  setErrors((prev) => ({ ...prev, position: "" }));
                }}
                aria-disabled={!formData.department}
                style={{
                  pointerEvents: !formData.department ? "none" : "auto",
                  opacity: !formData.department ? 0.5 : 1,
                }}
                {...inputStyles}
              >
                <option value="" style={optionStyle}>
                  {formData.department
                    ? "Выберите позицию"
                    : "Сначала выберите департамент"}
                </option>
                {positions.map((pos) => (
                  <option key={pos} value={pos} style={optionStyle}>
                    {pos}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.position && <Text {...errorStyle}>{errors.position}</Text>}
          </Field.Root>

          <Field.Root invalid={!!errors.telegramId}>
            <Field.Label color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Идентификатор Telegram
            </Field.Label>
            <Input
              placeholder="Только цифры, 8-12 знаков"
              value={formData.telegramId}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setFormData((prev) => ({ ...prev, telegramId: val }));
                setErrors((prev) => ({ ...prev, telegramId: "" }));
              }}
              maxLength={12}
              {...inputStyles}
            />
            {errors.telegramId && (
              <Text {...errorStyle}>{errors.telegramId}</Text>
            )}
          </Field.Root>

          <Button type="submit" colorScheme="blue" mt={2} w="100%">
            Создать сотрудника
          </Button>
        </VStack>
      </Box>

      <ToastNotification
        message="Сотрудник успешно создан!"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
};

export default AddEmployee;
