import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Header />
        <section className="container">
          <Outlet />
        </section>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
