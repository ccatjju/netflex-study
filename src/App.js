import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import MainPage from "./page/Main/MainPage";
import DetailPage from "./page/Detail/DetailPage";
import SearchPage from "./page/Search/SearchPage";

function App() {
  const Layout = () => {
    return (
      <div>
        <Nav />
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
