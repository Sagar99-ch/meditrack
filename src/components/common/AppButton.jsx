const AppButton = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          px-5
          py-2.5
          font-medium
          transition-all
          duration-200
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${variants[variant]}
          ${className}
        `}
    >
      {children}
    </button>
  );
};

export default AppButton;
