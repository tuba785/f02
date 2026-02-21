import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log("test:", data));

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Alex" }),
    });

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => console.log("users:", data));
  }, []);

  return <div>Check console</div>;
};

export default App;
