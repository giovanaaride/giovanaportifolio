import { useTheme } from "../../../contexts/ThemeContext";
import "./styles.modules.scss";

function HomeLayout() {
  const { darkMode, isPT } = useTheme(); // ← CONTEXT

  // textos em PT ou EN
  const Home = isPT ? {} : {};

  return (
    <section className={darkMode ? "home home-dark" : "home home-light"}>
      <div className="home-container">
        <img className="home-img" src="/dist/assets/Imghome.png" alt="Home" />

        <div className="text-home">
          <h1>
            {isPT ? "Hello World! Me chamo " : "Hello World! I'm "}
            <span className="my-name">Giovana Aride</span>
          </h1>{" "}
          <p>
            {isPT
              ? "Desenvolver é mais que escrever código: É criar experiências. Hoje faço isso no Front-End, mas minha meta é unir todas as peças e atuar como Full Stack, trazendo ideias para a vida de ponta a ponta."
              : "Developing is more than writing code: it’s about creating experiences. Today I do this in Front-End, but my goal is to connect all the pieces and work as a Full Stack developer, bringing ideas to life from end to end. "}
          </p>{" "}
          <div className="btn">
            <button className="ctt-btn">
              {isPT ? "Fale comigo" : "Contact me"}
            </button>
            <button className="cv-btn">
              {isPT ? "Download CV" : "Download CV"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLayout;
