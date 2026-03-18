import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHistory, FaSun, FaMoon, FaKeyboard } from 'react-icons/fa';
import CalcButton from './components/CalcButton';
import Display from './components/Display';
import HistoryPanel from './components/HistoryPanel';
import { useCalculator } from './hooks/useCalculator';

// Button layout: [label, type, wide?]
const BASIC_BUTTONS = [
  ['C','clear'],  ['±','fn'],  ['%','op'],  ['÷','op'],
  ['7','num'],    ['8','num'], ['9','num'], ['×','op'],
  ['4','num'],    ['5','num'], ['6','num'], ['-','op'],
  ['1','num'],    ['2','num'], ['3','num'], ['+','op'],
  ['0','num',true],            ['.','num'], ['=','eq'],
];

const SCI_BUTTONS = [
  ['sin','fn'], ['cos','fn'], ['tan','fn'], ['log','fn'],
  ['ln','fn'],  ['√','fn'],  ['x²','fn'],  ['1/x','fn'],
  ['π','fn'],   ['e','fn'],  ['⌫','fn'],  ['C','clear'],
];

export default function App() {
  const [showHistory, setShowHistory]   = useState(false);
  const [darkMode,    setDarkMode]      = useState(true);
  const [sciMode,     setSciMode]       = useState(false);
  const [showKbHint,  setShowKbHint]    = useState(false);

  const { display, expression, history, pressButton, deleteHistoryItem, clearHistory, recallHistory } = useCalculator();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${darkMode ? 'bg-[#111]' : 'bg-[#e8e8e8]'}`}>
      <div className={`relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm transition-colors
        ${darkMode ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}
        style={{ boxShadow: darkMode ? '0 40px 80px rgba(0,0,0,0.8)' : '0 40px 80px rgba(0,0,0,0.15)' }}>

        {/* Top bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
          <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            CALC<span className="text-orange-400">•</span>
          </span>
          <div className="flex gap-2">
            <button onClick={() => setShowKbHint(h => !h)} title="Keyboard shortcuts"
              className={`p-1.5 rounded-lg transition-colors text-xs ${darkMode ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
              <FaKeyboard size={13} />
            </button>
            <button onClick={() => setSciMode(s => !s)} title="Scientific mode"
              className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${sciMode ? 'bg-orange-500/20 text-orange-400' : darkMode ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700'}`}>
              SCI
            </button>
            <button onClick={() => setShowHistory(h => !h)} title="History"
              className={`p-1.5 rounded-lg transition-colors ${showHistory ? 'text-orange-400' : darkMode ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700'}`}>
              <FaHistory size={13} />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 text-white text-[9px] rounded-full flex items-center justify-center">
                  {Math.min(history.length, 9)}
                </span>
              )}
            </button>
            <button onClick={() => setDarkMode(d => !d)} title="Toggle theme"
              className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'text-gray-600 hover:text-yellow-400 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700'}`}>
              {darkMode ? <FaSun size={13} /> : <FaMoon size={13} />}
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        {showKbHint && (
          <div className={`px-4 py-2 text-xs border-b ${darkMode ? 'bg-[#111] border-[#2a2a2a] text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
            <span className="mr-4">0–9 numbers</span>
            <span className="mr-4">+ - * / operators</span>
            <span className="mr-4">Enter = result</span>
            <span>Esc / Del = clear</span>
          </div>
        )}

        {/* Display */}
        <div className="px-4 pt-4">
          <Display expression={expression} display={display} dark={darkMode} />
        </div>

        {/* Scientific buttons */}
        {sciMode && (
          <div className="px-4 pb-1 grid grid-cols-4 gap-2">
            {SCI_BUTTONS.map(([label, type]) => (
              <CalcButton key={label} label={label} type={type} onClick={pressButton} />
            ))}
          </div>
        )}

        {/* Basic buttons */}
        <div className="p-4 grid grid-cols-4 gap-2">
          {BASIC_BUTTONS.map(([label, type, wide], i) => (
            <CalcButton key={i} label={label} type={type} wide={wide} onClick={pressButton} />
          ))}
        </div>

        {/* History Panel */}
        {showHistory && (
          <HistoryPanel
            history={history}
            onRecall={(item) => { recallHistory(item); setShowHistory(false); }}
            onDelete={deleteHistoryItem}
            onClear={clearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </div>

      <ToastContainer position="bottom-center" theme={darkMode ? 'dark' : 'light'} autoClose={2000} />
    </div>
  );
}
