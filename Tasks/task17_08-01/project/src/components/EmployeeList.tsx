import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../store/employeesSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees);

  return (
    <div className="card">
      <h3>Employees List</h3>

      {employees.length === 0 && <p className="empty">No employees found</p>}

      {employees.map((emp: any) => (
        <div key={emp.id} className="employeeRow">
          <div className="employeeInfo">
            <p className="employeeName">{emp.fullName}</p>
            <p className="employeePosition">{emp.position}</p>
          </div>

          <button
            className="deleteBtn"
            onClick={() => dispatch(deleteEmployee(emp.id))}
          >
            <img src="/delete.svg" alt="delete" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
