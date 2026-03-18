import React from 'react';

const Display = ({ expression, display }) => {
  const fontSize = display.length > 14 ? 'text-2xl' : display.length > 10 ? 'text-3xl' : 'text-4xl';

  return (
    <div className="bg-[#0d0d0d] rounded-2xl px-5 py-4 mb-4 min-h-[110px] flex flex-col justify-between"
      style={{ boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.6)' }}>
      {/* Expression row */}
      <div className="text-right text-sm text-gray-600 font-mono min-h-[20px] truncate">
        {expression || '\u00A0'}
      </div>
      {/* Main display */}
      <div className={`display-text text-right text-white font-semibold leading-tight ${fontSize} transition-all`}>
        {display}
      </div>
    </div>
  );
};

export default Display;
