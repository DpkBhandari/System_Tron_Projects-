import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

// Safe client-side evaluator (mirrors server logic)
const clientEval = (expr) => {
  try {
    const safe = expr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, String(Math.PI)).replace(/e(?![0-9+\-])/g, String(Math.E));
    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) return 'Cannot divide by zero';
    if (isNaN(result))     return 'Error';
    return String(parseFloat(result.toPrecision(12)));
  } catch {
    return 'Error';
  }
};

export const useCalculator = () => {
  const [display,    setDisplay]    = useState('0');
  const [expression, setExpression] = useState('');
  const [history,    setHistory]    = useState([]);
  const [isResult,   setIsResult]   = useState(false);
  const [justCalc,   setJustCalc]   = useState(false);

  // Load history on mount
  useEffect(() => {
    axios.get('/history?limit=30')
      .then(({ data }) => setHistory(data.history || []))
      .catch(() => {});
  }, []);

  const appendToDisplay = useCallback((val) => {
    setDisplay(prev => {
      if (justCalc && /[0-9.(π]/.test(val)) { setJustCalc(false); setExpression(''); return val; }
      setJustCalc(false);
      if (prev === '0' && /[0-9]/.test(val) && !expression.endsWith('.')) return val;
      if (prev.length > 20) return prev;
      return prev === '0' && val !== '.' ? val : prev + val;
    });
  }, [justCalc, expression]);

  const pressButton = useCallback(async (btn) => {
    switch (btn) {
      case 'C':
        setDisplay('0'); setExpression(''); setIsResult(false); setJustCalc(false);
        return;
      case '⌫':
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        return;
      case '=': {
        const fullExpr = expression + display;
        const localResult = clientEval(fullExpr);
        setDisplay(localResult);
        setExpression(fullExpr + ' =');
        setIsResult(true);
        setJustCalc(true);
        // Persist to DB
        try {
          await axios.post('/calculate', { expression: fullExpr });
          const { data } = await axios.get('/history?limit=30');
          setHistory(data.history || []);
        } catch { /* silent */ }
        return;
      }
      case '+': case '-': case '×': case '÷': case '%':
        setExpression(prev => prev + display + ' ' + btn + ' ');
        setDisplay('0');
        setIsResult(false);
        setJustCalc(false);
        return;
      case '±':
        setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : prev === '0' ? '0' : '-' + prev);
        return;
      case '.':
        if (!display.includes('.')) appendToDisplay('.');
        return;
      case 'π':
        setDisplay(String(parseFloat(Math.PI.toPrecision(10))));
        setJustCalc(false);
        return;
      case 'e':
        setDisplay(String(parseFloat(Math.E.toPrecision(10))));
        setJustCalc(false);
        return;
      case 'x²':
        setDisplay(prev => String(parseFloat((parseFloat(prev) ** 2).toPrecision(12))));
        return;
      case '√':
        setDisplay(prev => {
          const n = parseFloat(prev);
          return n < 0 ? 'Error' : String(parseFloat(Math.sqrt(n).toPrecision(12)));
        });
        return;
      case '1/x':
        setDisplay(prev => {
          const n = parseFloat(prev);
          return n === 0 ? 'Cannot divide by zero' : String(parseFloat((1/n).toPrecision(12)));
        });
        return;
      case 'sin': case 'cos': case 'tan': case 'log': case 'ln':
        setDisplay(prev => {
          const n = parseFloat(prev);
          const fns = { sin: Math.sin, cos: Math.cos, tan: Math.tan, log: Math.log10, ln: Math.log };
          const res = fns[btn](n);
          return isFinite(res) ? String(parseFloat(res.toPrecision(12))) : 'Error';
        });
        return;
      default:
        appendToDisplay(btn);
    }
  }, [expression, display, appendToDisplay]);

  // Keyboard support
  useEffect(() => {
    const map = {
      '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
      '.':'.', '+':'+', '-':'-', '*':'×', '/':'÷', '%':'%',
      'Enter':'=', '=':'=', 'Backspace':'⌫', 'Escape':'C', 'Delete':'C'
    };
    const handler = (e) => {
      const btn = map[e.key];
      if (btn) { e.preventDefault(); pressButton(btn); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pressButton]);

  const deleteHistoryItem = async (id) => {
    try {
      await axios.delete(`/history/${id}`);
      setHistory(prev => prev.filter(h => h._id !== id));
    } catch { toast.error('Failed to delete'); }
  };

  const clearHistory = async () => {
    try {
      await axios.delete('/history');
      setHistory([]);
      toast.info('History cleared');
    } catch { toast.error('Failed to clear history'); }
  };

  const recallHistory = (item) => {
    setDisplay(item.result);
    setExpression(item.expression + ' =');
    setJustCalc(true);
  };

  return {
    display, expression, history, isResult,
    pressButton, deleteHistoryItem, clearHistory, recallHistory
  };
};
