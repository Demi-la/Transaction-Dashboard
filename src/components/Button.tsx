import { ReactNode } from "react";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  btnType?: "primary" | "secondary";
}

const Button: React.FC<ButtonType> = ({
  children,
  icon,
  btnType = "primary",
  className = "",
  loading,
  ...rest
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200";

  const btnStyles = {
    primary: "bg-green-600 text-white hover:bg-[#2d416f]",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button
      {...rest}
      className={`${baseStyles} ${btnStyles[btnType]} ${className}`}
    >
      {loading ? (
        <i>Loading...</i>
      ) : (
        <>
          {children} {icon}
        </>
      )}
    </button>
  );
};

export default Button;
