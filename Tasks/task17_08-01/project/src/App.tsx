import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div className="container">
      <h1>Mini HR Dashboard</h1>
      <p className="subtitle">Manage your employees efficiently</p>

      <AddEmployee />
      <EmployeeList />
    </div>
  );
}

export default App;
