function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  title,
  variant = "solid",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
