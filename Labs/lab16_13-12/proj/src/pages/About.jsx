import { useSettingsContext } from "../context/SettingContext";

const About = () => {
  const { words } = useSettingsContext();

  return (
    <main className="page">
      <h1 className="title">{words.title}</h1>
      <p className="subtitle">{words.about}</p>
    </main>
  );
};

export default About;
