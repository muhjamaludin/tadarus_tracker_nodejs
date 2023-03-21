import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEditTadarus from "./pages/AddEditTadarus";
import TadarusList from "./pages/TadarusList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TadarusList />} />
        <Route path="/add" element={<AddEditTadarus />} />
        <Route path="/edit/:id" element={<AddEditTadarus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
