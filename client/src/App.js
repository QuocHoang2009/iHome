import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./app/theme";
import sidebarItems from "./const/sidebarItems";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              {sidebarItems.map((item, key) => {
                let pages = item.component;
                return <Route key={key} path={item.path} element={pages} />;
              })}
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
