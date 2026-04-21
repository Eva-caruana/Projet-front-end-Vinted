import "./Button.css";

const Button = ({
  variant = "filled",
  width = "auto",
  size = "small",
  type = "button",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn--${variant} btn--${width} btn--${size}`}
      type={type}
      disabled={disabled}
    >
      {children} {/* texte qui se trouve entre les balises buttons */}
    </button>
  );
};

export default Button;
