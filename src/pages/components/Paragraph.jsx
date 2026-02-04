import { Weight } from "lucide-react";

const Paragraph = ({ children, theme = 'dark', justify = 'center', bold = false }) => {
  const themeClass = theme === 'dark' ? 'text-paragraph-color' : 'text-paragraph-light-color';
  const boldClass = bold ? 'font-bold' : ''; // Clase para negrita si se habilita `bold`.

  return (
    <p
      className={`${themeClass} ${boldClass} text-p-size text-${justify}`}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {children}
    </p>
  );
};

export default Paragraph;