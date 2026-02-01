import { Link, useSearchParams } from "react-router-dom";
import { students } from "../data/students";

export default function StudentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status");

  const filtered = status
    ? students.filter((s) => s.status === status)
    : students;

  const setFilter = (value: string | null) => {
    if (!value) {
      setSearchParams({});
    } else {
      setSearchParams({ status: value });
    }
  };

  return (
    <div className="page">
      <h1>Students</h1>

      <div className="filters">
        <button onClick={() => setFilter(null)}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("graduated")}>Graduated</button>
      </div>

      {filtered.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>Status: {s.status}</p>

          <Link to={`/students/${s.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}
