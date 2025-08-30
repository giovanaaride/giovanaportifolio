import { useState } from "react";
import "./styles.modules.scss";
import { FaMoon } from "react-icons/fa";
import { Sun, Moon, Languages } from "lucide-react";


function Header() {
  // dark mode
  const [darkMode, setDarkMode] = useState(true); // começa escuro
  
  const toggleTheme = () => setDarkMode(!darkMode);

  // idioma
  const [isPT, setIsPT] = useState(true); // começa em português

  const toggleLanguage = () => setIsPT(!isPT);

  // Textos do menu
  const menuText = isPT
    ? ["Início", "Sobre mim", "Projetos", "Contato"]
    : ["Home", "About me", "Projects", "Contact"];

  //---------------------------------------------------------------

  return (
    <header className={darkMode ? "dark-theme" : "light-theme"}>
      <img src="dist/assets/giovanadarklogo.png" alt="Logo" />

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
    </header>
  );
}

export default Header;
