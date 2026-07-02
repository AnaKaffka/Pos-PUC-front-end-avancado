import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import CareTipsPage from "./pages/CareTipsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PetDiaryPage from "./pages/PetDiaryPage";
import PetsPage from "./pages/PetsPage";

function App() {
  return (
    <div className="app-bg">
      <div className="app-shell">
        <AppHeader />
        <main className="content-wrap">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/pets/:petId/diario" element={<PetDiaryPage />} />
            <Route path="/cuidados" element={<CareTipsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
