import "./App.scss";
import HomePage from "./pages/homePage";
import LogInPage from "./pages/logInPage";
import Favorites from "./pages/favoritesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/protectedRoutes";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route element={<ProtectedRoutes redirectTo="/" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
