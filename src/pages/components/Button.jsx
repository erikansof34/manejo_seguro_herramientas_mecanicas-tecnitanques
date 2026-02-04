/* eslint-disable react/prop-types */
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  children,
  bold = false,
  icon = faHatWizard,
  roundedFull = false,
  onClick,
  disabled = false,
}) => {
  const boldClass = bold ? "font-bold" : "";
  const roundedFullClass = roundedFull ? "rounded-full" : "rounded-lg";
  const disabledStyle = disabled
    ? {
        backgroundColor: "#6A8EBB", // Color más claro
        cursor: "not-allowed",
        boxShadow: "none",
      }
    : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-button-color text-white px-4 py-2 text-p-size shadow-sm hover:shadow-md shadow-main-color/50 hover:shadow-main-color/40 transition-shadow duration-300 ${boldClass} ${roundedFullClass}`}
      style={{
        fontFamily: "Montserrat, sans-serif",
        ...disabledStyle, // Aplicar estilos condicionalmente
      }}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {children}
    </button>
  );
};

export default Button;
