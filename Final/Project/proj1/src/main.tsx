import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AppTest from "./AppTest.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={theme}>
        {/* <App /> */}
        <AppTest />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
