import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fullName = form.fullName.value;
    const position = form.position.value;

    dispatch(
      addEmployee({
        id: Date.now(),
        fullName,
        position,
        isActive: true,
      })
    );

    form.reset();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>

      <label>Full Name</label>
      <input name="fullName" placeholder="Enter full name" required />

      <label>Job Position</label>
      <input name="position" placeholder="Enter job position" required />

      <button>Add Employee</button>
    </form>
  );
};

export default AddEmployee;
