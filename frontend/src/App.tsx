import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { colors, ROUTES, screenSize } from "./constants";
import { useAuth } from "./context/authContext";
import { Stack, useMediaQuery } from "@mui/material";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Landing from "./pages/landing";

function App() {
  const { user, isLoggedIn } = useAuth();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isPcAndAbove = useMediaQuery(`(min-width:${screenSize.pc})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const { REGISTER, LOGIN, DASHBOARD, PROFILE } = ROUTES;

  return (
    <Stack sx={{ height: "100vh", minHeight: "100vh", margin: 0 }}>
      <Header />
      <Stack
        sx={{
          height: "100%",
          overflowY: "auto",
          bgcolor: colors.lightGrey,
        }}
      >
        <Routes>
          <Route element={<Landing />} index />
          <Route element={<Register />} path={REGISTER} />
          <Route element={<Login />} path={LOGIN} />
        </Routes>
        {isLoggedIn && (
          <Stack
            sx={{
              maxWidth: "1300px",
              ...(isPcAndAbove && { width: "100%" }),
              margin: isTablet ? "0" : "0 auto",
              padding: isMobile ? 2 : 3,
            }}
          >
            <Routes>
              <Route path="" element={<ProtectedRoute />}>
                <Route
                  element={<Dashboard userInfo={user} />}
                  path={DASHBOARD}
                />
                <Route element={<Profile />} path={PROFILE} />
              </Route>
            </Routes>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
