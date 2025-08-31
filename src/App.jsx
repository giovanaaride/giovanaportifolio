import Header from "./components/pages/Header";
import HomeLayout from "./components/pages/HomeLayout";
import { ThemeProvider } from "./contexts/ThemeContext";

import AOS from 'aos';
import 'aos/dist/aos.css';
import "./styles/globals.scss";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
  AOS.init({
    duration: 1000,    // Duração das animações
    once: true,        // Anima apenas uma vez
    offset: 100,       // Trigger 100px antes do elemento
  });
}, []);

  return (
    <ThemeProvider>
      <Header />
      <HomeLayout />
    </ThemeProvider>
  );
}

export default App;

 {/*  <Escritorio />
      <Atuaçao />
      <Equipe />
      <Contato />*/}