import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import "./styles.modules.scss";

import { FaMoon } from "react-icons/fa";
import { Sun, Languages, X, Menu } from "lucide-react";
import logoDark from "/assets/giovanadarklogo.png";
import logoLight from "/assets/giovanalightlogo.png";

function Header() {
  // TROCA ESTAS 4 LINHAS:
  const { darkMode, toggleTheme, isPT, toggleLanguage } = useTheme();

  // Menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora do menu e fora do botão hamburger
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    // Adiciona o event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Recria o effect quando isMobileMenuOpen muda

  // Textos do menu
  const menuText = isPT
    ? ["Início", "Sobre mim", "Projetos", "Contato"]
    : ["Home", "About me", "Projects", "Contact"];

  return (
    <header className={darkMode ? "dark-theme" : "light-theme"}>
      <a href="#home" className="logo-link">
        {" "}
        {darkMode ? (
          <img src={logoDark} alt="Logo" className="logo" />
        ) : (
          <img src={logoLight} alt="Logo" className="logo" />
        )}
      </a>


      <div className="menu">
        <nav>
          <ul>
            {menuText.map((item, index) => (
              <li key={index}>
                <a href={`#${item.toLowerCase().replace(" ", "")}`}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="toggle">
        <div className="btn-toggle">
          <div className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? (
              <Sun color="#ffd86dff" size={24} />
            ) : (
              <FaMoon size={24} />
            )}
          </div>
        </div>

        <div className="lang-toggle" onClick={toggleLanguage}>
          {isPT ? (
            <Languages size={36} title="Mudar para Inglês" />
          ) : (
            <Languages size={36} title="Switch to Portuguese" />
          )}
        </div>
      </div>

      {/* Botão Hamburguer com ref */}
      <div
        ref={hamburgerRef}
        className="hamburger-btn"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Overlay para fechar o menu */}
      {isMobileMenuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMobileMenu}
          onKeyDown={(e) => e.key === "Escape" && closeMobileMenu()}
          tabIndex={0}
          aria-label="Fechar menu"
        ></div>
      )}

      {/* Menu Mobile */}
      <div
        ref={menuRef}
        className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
      >
        <button
          className="close-menu"
          onClick={closeMobileMenu}
          aria-label="Fechar menu"
        ></button>

        <nav>
          <ul>
            {menuText.map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  onClick={closeMobileMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggles dentro do menu mobile */}
        <div className="mobile-toggle">
          <div className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? (
              <Sun color="#ffd86dff" size={24} />
            ) : (
              <FaMoon size={24} />
            )}
          </div>

          <div className="lang-toggle" onClick={toggleLanguage}>
            <Languages
              size={30}
              title={isPT ? "Mudar para Inglês" : "Switch to Portuguese"}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
