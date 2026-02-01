import { Routes, Route, Navigate } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";
import StudentDetailPage from "./pages/StudentDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/students" />} />

      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
    </Routes>
  );
}

export default App;
