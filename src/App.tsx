import "./App.css";
import { MainPage } from "./pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { PATHS } from "./consts/paths";
import { DownloadPage } from "./pages/DownloadPage";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import AboutUs from "./pages/AboutUs";
import Tutorial from "./pages/Tutorial";
import { HackingPage } from "./pages/HackingPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter basename="/">
          <AppWithRecoil />
          <ToastContainer draggable theme={"dark"} />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
function AppWithRecoil() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path={PATHS.start} element={<StartPage />}/>
        <Route path={PATHS.home} element={<HomePage />}/>
        <Route path={PATHS.aboutUs}  element = {<AboutUs />} />
        <Route path={PATHS.tutorial} element = {<Tutorial />} />
        <Route path={PATHS.createFile} element={<MainPage />} />
        <Route path={PATHS.hacking} element={<HackingPage />} />
        <Route
          path={PATHS.downloadFile}
          element={
            location !== null &&
            location !== undefined &&
            location.state !== null &&
            location.state !== undefined &&
            location.state.folderName !== null &&
            location.state.folderName !== undefined ? (
              <DownloadPage />
            ) : (
              <MainPage />
            )
          }
        />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
