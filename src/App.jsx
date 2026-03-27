import { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Background from './components/Background';
import TextAnalyzer from './components/TextAnalyzer';
import FileAnalyzer from './components/FileAnalyzer';
import Results from './components/Results';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [analyzedText, setAnalyzedText] = useState("");
  const resultsRef = useRef(null);

  const handleResult = (data, text = "") => {
    setResult(data);
    setAnalyzedText(text);
    // Smooth scroll to results after a short delay to allow rendering
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <Background />
      <div className="app-shell">
        <Header />

        <main className="main-content">
          <Hero />

          <div className="analyzer-grid">
            <div className="analyzer-column">
              <TextAnalyzer onResult={(data, text) => handleResult(data, text)} />
            </div>
            <div className="analyzer-column">
              <FileAnalyzer onResult={(data, file) => handleResult(data, file.name)} />
            </div>
          </div>

          <div ref={resultsRef} className="results-container">
            {result && <Results result={result} originalText={analyzedText} />}
          </div>

          <footer className="footer-simple">
            <p>© 2026 JobGuard AI. Built with React & TensorFlow</p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
