import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./colors";

const config = defineConfig({
  globalCss: {
    body: {
      bg: "bg.page",
      color: "text.primary",
      transition: "background-color 0.2s ease, color 0.2s ease",
    },
  },
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
    semanticTokens: {
      colors: {
        // ── Backgrounds ──
        "bg.page": {
          value: { _light: "#ffffff", _dark: "#0f0f1a" },
        },
        "bg.surface": {
          value: { _light: "#ffffff", _dark: "#1a1a2e" },
        },
        "bg.surfaceMuted": {
          value: { _light: "#fafafa", _dark: "#1e1e30" },
        },
        "bg.subtle": {
          value: { _light: "#f0f0f0", _dark: "#2a2a3c" },
        },
        "bg.subtler": {
          value: { _light: "#f8f8fb", _dark: "#24243a" },
        },
        "bg.input": {
          value: { _light: "#ffffff", _dark: "#1e1e30" },
        },
        "bg.placeholder": {
          value: { _light: "#e0e0e0", _dark: "#3a3a4c" },
        },
        "bg.tooltip": {
          value: { _light: "#1a202c", _dark: "#2d2d3f" },
        },
        "bg.track": {
          value: { _light: "#e8e8e8", _dark: "#3a3a4c" },
        },
        "bg.skeleton": {
          value: { _light: "gray.300", _dark: "gray.600" },
        },
        "bg.badge": {
          value: { _light: "gray.100", _dark: "gray.700" },
        },

        // ── Text ──
        "text.primary": {
          value: { _light: "#11142d", _dark: "#e2e4e9" },
        },
        "text.heading": {
          value: { _light: "#1a202c", _dark: "#e2e4e9" },
        },
        "text.secondary": {
          value: { _light: "#808191", _dark: "#9ca3b0" },
        },
        "text.tertiary": {
          value: { _light: "#b0b7c3", _dark: "#6b7280" },
        },
        "text.placeholder": {
          value: { _light: "#9ca3af", _dark: "#6b7280" },
        },
        "text.muted": {
          value: { _light: "gray.500", _dark: "gray.400" },
        },
        "text.subtle": {
          value: { _light: "gray.600", _dark: "gray.400" },
        },
        "text.strong": {
          value: { _light: "gray.800", _dark: "gray.100" },
        },
        "text.onBrand": {
          value: { _light: "#ffffff", _dark: "#ffffff" },
        },
        "text.inverse": {
          value: { _light: "black", _dark: "white" },
        },

        // ── Borders ──
        "border.default": {
          value: { _light: "#e8e8e8", _dark: "#3a3a4c" },
        },
        "border.subtle": {
          value: { _light: "#f0f0f0", _dark: "#2d2d3f" },
        },
        "border.muted": {
          value: { _light: "#ebebeb", _dark: "#3a3a4c" },
        },
        "border.input": {
          value: { _light: "#e2e8f0", _dark: "#3a3a4c" },
        },
        "border.control": {
          value: { _light: "#d0d5dd", _dark: "#4a4a5a" },
        },
        "border.header": {
          value: { _light: "gray.200", _dark: "gray.600" },
        },
        "border.brandHover": {
          value: { _light: "#d9d5ff", _dark: "#4a3f8a" },
        },
        "border.paginationHover": {
          value: { _light: "#ccc", _dark: "gray.500" },
        },

        // ── Brand ──
        "brand.purple": {
          value: { _light: "#6c5dd3", _dark: "#8b7fdf" },
        },
        "brand.lightPurple": {
          value: { _light: "#f0eeff", _dark: "#2d2a4a" },
        },
        "brand.orange": {
          value: { _light: "#ff754c", _dark: "#ff8f6e" },
        },
        "brand.purpleFaint": {
          value: { _light: "#6c5dd318", _dark: "rgba(108,93,211,0.12)" },
        },

        // ── Status ──
        "status.error": {
          value: { _light: "#e53e3e", _dark: "#fc8181" },
        },
        "status.errorText": {
          value: { _light: "red.500", _dark: "red.300" },
        },
        "status.errorBorder": {
          value: { _light: "red.400", _dark: "red.300" },
        },
        "status.success": {
          value: { _light: "#4caf50", _dark: "#66bb6a" },
        },
        "status.successBg": {
          value: { _light: "#e8f5e9", _dark: "rgba(76,175,80,0.15)" },
        },
        "status.inactive": {
          value: { _light: "#cbd5e0", _dark: "#4a5568" },
        },
        "status.stepperTrack": {
          value: { _light: "#e5e7eb", _dark: "#3a3a4c" },
        },

        // ── Hover ──
        "hover.surface": {
          value: { _light: "#f0f0f0", _dark: "#2d2d3f" },
        },
        "hover.brand": {
          value: { _light: "#f0eeff", _dark: "rgba(108,93,211,0.15)" },
        },
        "hover.brandAlt": {
          value: { _light: "#fff5f2", _dark: "rgba(255,117,76,0.12)" },
        },
        "hover.danger": {
          value: { _light: "#fff5f5", _dark: "rgba(229,62,62,0.12)" },
        },
        "hover.arrow": {
          value: { _light: "#f7fafc", _dark: "rgba(255,255,255,0.08)" },
        },
        "hover.pagination": {
          value: { _light: "#f5f5f5", _dark: "#2a2a3c" },
        },

        // ── Overlay ──
        "overlay.light": {
          value: { _light: "rgba(0,0,0,0.4)", _dark: "rgba(0,0,0,0.6)" },
        },
        "overlay.heavy": {
          value: { _light: "rgba(0,0,0,0.6)", _dark: "rgba(0,0,0,0.7)" },
        },
      },
    },
  },
});

export const theme = createSystem(defaultConfig, config);
