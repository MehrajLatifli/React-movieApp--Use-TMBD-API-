import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import "./Asserts/css/style.css";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Favorite from "./Pages/Favorite/Favorite";

function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/details" element={<Details />} />
          <Route path="/serchresult" element={<SearchResult />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
