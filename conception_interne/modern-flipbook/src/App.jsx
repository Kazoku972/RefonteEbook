import React, { useState } from 'react';
import Book from './components/Book';
import { Moon, Sun, Languages } from 'lucide-react';
import { translations } from './translations';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const t = translations[language].ui;

  return (
    <div className="App transition-colors duration-500">
      
      {/* FLOATING CONTROLS CONTAINER */}
      <div className="fixed top-6 right-6 z-60 flex gap-3">
        {/* LANGUAGE TOGGLE */}
        <button 
          onClick={toggleLanguage}
          className={`group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all active:scale-95 ${
            isDarkMode 
              ? 'bg-[#2a2a2a] text-[#B7C6B0] border border-white/10 hover:bg-[#333]' 
              : 'bg-white text-[#6D8264] border border-black/5 hover:bg-gray-50'
          }`}
          title={t.langSwitch}
        >
          <Languages size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-sm tracking-widest uppercase">
            {language === 'fr' ? 'EN' : 'FR'}
          </span>
        </button>

        {/* THEME TOGGLE */}
        <button 
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all active:scale-95 ${
            isDarkMode 
              ? 'bg-[#2a2a2a] text-[#E8A3A8] border border-white/10 hover:bg-[#333]' 
              : 'bg-white text-[#6D8264] border border-black/5 hover:bg-gray-50'
          }`}
          title={isDarkMode ? t.dayMode : t.nightMode}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <Book isDarkMode={isDarkMode} language={language} />
    </div>
  );
}

export default App;
