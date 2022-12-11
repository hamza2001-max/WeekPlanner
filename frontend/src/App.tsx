import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "./components/NavBar";
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

export const client = new QueryClient();
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
