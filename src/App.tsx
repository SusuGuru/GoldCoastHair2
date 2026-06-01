import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Navbar from "./components/Navbar";
import { CurrencyProvider } from "@/hooks/CurrencyContext";
import AnnouncementBar from "./components/AnnouncementBar";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <CurrencyProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <AnnouncementBar />
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </CurrencyProvider>
    </I18nextProvider>
  );
}

export default App;
