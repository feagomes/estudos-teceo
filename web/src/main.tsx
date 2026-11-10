import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { TaskPanelProvider } from "./context/TaskPanelContext";
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: "#A8855C" },
    background: { default: "#F3EDE3", paper: "#FBF7F0" },
    text: { primary: "#3F3730", secondary: "#8A7B6B" },
  },
  typography: { fontFamily: "system-ui, sans-serif" },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TaskPanelProvider>
          <App />
        </TaskPanelProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
