import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./i18n";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={theme}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
