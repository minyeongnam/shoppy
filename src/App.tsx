import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <section className="container">
        <Outlet />
      </section>
    </AuthContextProvider>
  );
}

export default App;
