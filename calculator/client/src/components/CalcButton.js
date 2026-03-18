import React from 'react';

const typeClass = {
  eq:    'btn-eq',
  op:    'btn-op',
  fn:    'btn-fn',
  clear: 'btn-clear',
  num:   'btn-num',
};

const CalcButton = ({ label, type = 'num', wide = false, onClick }) => (
  <button
    className={`calc-btn ${typeClass[type] || 'btn-num'} ${wide ? 'col-span-2' : ''} h-14 flex items-center justify-center`}
    onClick={() => onClick(label)}
    aria-label={label}
  >
    {label}
  </button>
);

export default CalcButton;
