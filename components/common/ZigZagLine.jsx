import React from 'react';

const ZigZagLine = ({ color = '#000', width = '100%', height = 4, strokeWidth = 2, zigZagWidth = 10 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${zigZagWidth * 10} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`
          M0 ${height / 2} 
          ${Array.from({ length: 10 }, (_, i) =>
            `L${zigZagWidth * i + zigZagWidth / 2} ${i % 2 === 0 ? 0 : height} `
          ).join('')}
          L${zigZagWidth * 10} ${height / 2}
        `}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export default ZigZagLine;
