import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "./components/NavBar";
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";

export const client = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
