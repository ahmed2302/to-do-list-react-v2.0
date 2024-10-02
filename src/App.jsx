import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./Components/TodoList";
import TodoProvider from "./Context/todoContext";
import AlertProvider from "./Context/AlertContext";

export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Alex"],
    },
    palette: {
      primary: {
        main: "#333",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
