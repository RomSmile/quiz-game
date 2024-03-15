import { Navigate, Route, Routes } from "react-router-dom";
import { StartPage, Quiz, FinishPage } from "@/routes";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/start" />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/finish" element={<FinishPage />} />
      </Routes>
    </div>
  );
}

export default App;
