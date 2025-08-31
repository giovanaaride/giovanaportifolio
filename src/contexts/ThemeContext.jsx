/* eslint-disable react-refresh/only-export-components */
// Desativa a regra do ESLint que reclama quando exportamos funções não-componentes
// (neste caso, o hook useTheme no mesmo arquivo do componente).

import { createContext, useContext, useState, useEffect } from 'react';
// Importa funções essenciais do React:
// - createContext: cria um contexto global
// - useContext: consome valores do contexto
// - useState: cria estados locais
// - useEffect: executa efeitos colaterais quando algo muda

const ThemeContext = createContext();
// Cria o contexto que será usado para compartilhar informações de tema e idioma.

export function ThemeProvider({ children }) {
  // Componente que vai envolver toda a aplicação para fornecer o contexto.

  // Estado para controlar o tema (escuro ou claro), com valor inicial do localStorage.
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode'); // Busca no localStorage
    return saved !== null ? JSON.parse(saved) : true; // Se tiver valor salvo, usa. Senão, true (escuro por padrão).
  });

  // Estado para controlar o idioma (português ou outro), também com valor inicial do localStorage.
  const [isPT, setIsPT] = useState(() => {
    const saved = localStorage.getItem('isPT');
    return saved !== null ? JSON.parse(saved) : true; // Se não tiver salvo, começa como português (true).
  });

  // Efeito colateral que aplica classes no <body> para definir o tema via CSS.
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');  // Adiciona classe para tema escuro
      document.body.classList.remove('light-theme'); // Remove classe do tema claro
    } else {
      document.body.classList.add('light-theme'); // Adiciona classe para tema claro
      document.body.classList.remove('dark-theme'); // Remove classe do tema escuro
    }
  }, [darkMode]); // Só roda quando darkMode mudar

  // Função que alterna o tema (escuro <-> claro)
  const toggleTheme = () => setDarkMode(prev => !prev);

  // Função que alterna o idioma (PT <-> outro idioma)
  const toggleLanguage = () => setIsPT(prev => !prev);

  // Salva o estado do tema no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Salva o estado do idioma no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('isPT', JSON.stringify(isPT));
  }, [isPT]);

  // Objeto com os valores e funções que serão compartilhados pelo contexto
  const value = {
    darkMode,
    toggleTheme,
    isPT,
    toggleLanguage
  };

  // Retorna o Provider com os valores, englobando todos os children
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar os valores do contexto
export const useTheme = () => {
  const context = useContext(ThemeContext); // Consome o contexto
  if (!context) {
    console.warn('useTheme foi usado fora do ThemeProvider!'); // Aviso no console se usado errado
  }
  // Retorna o contexto ou valores padrão (para não quebrar a aplicação)
  return context || {
    darkMode: true,
    toggleTheme: () => {},
    isPT: true,
    toggleLanguage: () => {},
  };
};
