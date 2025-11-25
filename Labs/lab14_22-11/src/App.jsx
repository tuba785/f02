import Profile from './components/profile';
import { students } from './data/students';
import './App.css';

function App() {
  const clicked = (name) => {
    alert(`Clicked on student: ${name}`);
  };

  return (
    <div className="App">
      <h1>Student Profiles</h1>
      <div className="profiles-container">
        {students.map((student) => (
          <Profile key={student.id} student={student} onClick={clicked} />
        ))}
      </div>
    </div>
  );
}

export default App;
