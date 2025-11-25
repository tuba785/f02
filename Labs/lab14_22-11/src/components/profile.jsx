function Profile({ student, onClick }) {
  return (
    <div className="profile-card" onClick={() => onClick(student.name)}>
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
    </div>
  );
}
export default Profile;
