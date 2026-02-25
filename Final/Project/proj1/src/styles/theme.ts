import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: {
          purple: { value: colors.primary.purple },
          lightPurple: { value: colors.primary.lightPurple },
          orange: { value: colors.primary.orange },
        },
      },
    },
  },
});
