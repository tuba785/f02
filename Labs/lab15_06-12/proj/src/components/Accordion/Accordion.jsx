import { useState } from "react";
import "./Accordion.css";

export default function Accordion() {
  const [activeId, setActiveId] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("Select a topic");

  const topics = [
    { id: 1, title: "HTML Basics", text: "HTML is the structure of the web." },
    { id: 2, title: "CSS Styling", text: "CSS controls the look of elements." },
    { id: 3, title: "JavaScript Logic", text: "JS adds interactivity." },
  ];

  const handleToggle = (id, title) => {
    if (activeId === id) {
      setActiveId(null);
      setHeaderTitle("Select a topic");
    } else {
      setActiveId(id);
      setHeaderTitle(title);
    }
  };

  return (
    <div>
      <h2>{headerTitle}</h2>

      <div className="accordion">
        {topics.map((topic) => (
          <div key={topic.id} className="item">
            <button
              className="title"
              onClick={() => handleToggle(topic.id, topic.title)}
            >
              {topic.title}
            </button>

            {activeId === topic.id && (
              <div className="content">{topic.text}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
