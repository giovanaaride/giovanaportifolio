import { useTheme } from "../../../contexts/ThemeContext";
import "./styles.modules.scss";
import { useState, useEffect } from "react";

function HomeLayout() {
  const { darkMode, isPT } = useTheme(); // ← CONTEXT

  // textos em PT ou EN
  const Home = isPT ? {} : {};

  // Animação Texto
  const [displayedBase, setDisplayedBase] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [phase, setPhase] = useState(0); // 0: base, 1: nome

  const baseText = isPT ? "Hello World! Me chamo" : "Hello World! I'm";
  const fullName = "Giovana Aride";

  useEffect(() => {
    if (phase === 0 && displayedBase.length < baseText.length) {
      const timer = setTimeout(() => {
        setDisplayedBase(baseText.slice(0, displayedBase.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else if (phase === 0) {
      setPhase(1);
    } else if (phase === 1 && displayedName.length < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayedName(fullName.slice(0, displayedName.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [displayedBase, displayedName, phase, baseText, fullName]);

  // Reseta quando isPT mudar
  useEffect(() => {
    setDisplayedBase("");
    setDisplayedName("");
    setPhase(0);
  }, [isPT]);

  return (
    <section className={darkMode ? "home home-dark" : "home home-light"}>
      <div className="home-container">
        <img
          className="home-img"
          src="/dist/assets/Imghome.png"
          alt="Home"
          data-aos="fade-right"
        />

        <div className="text-home">
          <h1>
            {displayedBase}
            {displayedName && (
              <>
                <br />
                <span className="my-name">
                  {displayedName}
                  <span className="cursor">|</span>
                </span>
              </>
            )}
          </h1>
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
              {isPT ? "Baixar CV" : "Download CV"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLayout;
