import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <section className="container">
        <Outlet />
      </section>
    </>
  );
}

export default App;
