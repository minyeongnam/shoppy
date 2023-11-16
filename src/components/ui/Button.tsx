import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "css"> {}

export default function Button({
  type = "button",
  children,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
