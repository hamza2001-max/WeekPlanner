import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "./components/NavBar";
import { Home } from "./Pages/Home";

export const client = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
