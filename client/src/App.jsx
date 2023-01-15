import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./app/theme";
import Pages from "./pages";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";

const App = () => {
  const [theme, colorMode] = useMode();
  //const Navigate = useNavigate();
  const isAuth = Boolean(useSelector((state)=> state.token));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/*" element={isAuth ? <Pages /> : <Navigate to="/login" />}/>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
