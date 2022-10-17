import { ThemeProvider } from "styled-components";
import { Transaction } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    //provider de contexto do styled-components
    <ThemeProvider theme={defaultTheme}> 
      <GlobalStyle />

      <Transaction />
    </ThemeProvider>
  )
}