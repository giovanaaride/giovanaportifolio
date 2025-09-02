import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import "./styles.modules.scss";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ImgHome from "/assets/Imghome.png";

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
      {/* Image Home */}
      <div className="home-container">
        <a
          //href="#"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-right"
          data-aos-delay="300"
          className="home-img-wrapper"
        >
          <img src={ImgHome} alt="Logo" className="Giovana" />
        </a>

        {/* Title and Text Home */}
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
          {/* Buttons */}
          <div className="btn">
            <a className="ctt-btn" href="https://w.app/giovanaaride">
              {isPT ? "Fale comigo" : "Contact me"}
            </a>

            <a
              className="cv-btn"
              href={
                isPT
                  ? "/assets/public/curriculo_giovana_pt.pdf"
                  : "/assets/public/curriculum_giovana_en.pdf"
              }
              download={
                isPT
                  ? "curriculo_giovana_pt.pdf"
                  : "curriculum_giovana_en.pdf"
              }
            >
              {isPT ? "Baixar CV" : "Download CV"}
            </a>
          </div>
          {/* Icons */}
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/giovana-aride-24759b28a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin data-aos="fade-up" data-aos-delay="100" />
            </a>
            <a
              href="https://github.com/giovanaaride"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub data-aos="fade-up" data-aos-delay="200" />
            </a>
            <a href="mailto:giovanaaride@gmail.com">
              <MdEmail data-aos="fade-up" data-aos-delay="300" />
            </a>
          </div>{" "}
        </div>
      </div>
    </section>
  );
}

export default HomeLayout;
