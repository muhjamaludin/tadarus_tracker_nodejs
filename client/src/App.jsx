import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEditTadarus from "./pages/AddEditTadarus";
import ChartStatistic from "./pages/chartStatistic";
import TadarusList from "./pages/TadarusList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TadarusList />} />
        <Route path="/add" element={<AddEditTadarus />} />
        <Route path="/edit/:id" element={<AddEditTadarus />} />
        <Route path="/stats" element={<ChartStatistic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
