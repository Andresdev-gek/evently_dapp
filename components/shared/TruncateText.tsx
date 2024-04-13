import React from 'react';

interface Props {
  text: string;
}

const TruncateText: React.FC<Props> = ({ text }) => {
  // Función para truncar el texto si excede los 30 caracteres
  const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <p className="hidden lg:block text-xs truncate overflow-hidden" title={text}>
      {truncate(text, 25)}
    </p>
  );
};

export default TruncateText;