import { useSettingsContext } from "../context/SettingContext";

const Home = () => {
  const { words } = useSettingsContext();

  return (
    <main className="page">
      <h1 className="title">{words.title}</h1>
      <p className="subtitle">{words.home}</p>
    </main>
  );
};

export default Home;
