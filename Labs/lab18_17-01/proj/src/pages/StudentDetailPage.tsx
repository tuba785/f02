import { useParams, useNavigate } from "react-router-dom";
import { students } from "../data/students";

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === id);

  if (!student) return <div>Student not found</div>;

  return (
    <div className="page">
      <h1>Student Detail</h1>

      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Status: {student.status}</p>

      <button onClick={() => navigate("/students")}>Back to list</button>
    </div>
  );
}
