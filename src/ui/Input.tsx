import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  isSelected?: boolean;
  isTextCentered?: boolean;
}
export function Input({
  isSelected = false,
  isTextCentered = false,
  ...props
}: InputProps) {
  const bgColor = isSelected ? "bg-yellow" : "bg-gray";
  const inputOpacity = props.disabled ? "opacity-50" : "opacity-100";
  const textCentered = isTextCentered ? "text-center" : "text-left";
  const inputStyle = ` w-full rounded-full ${bgColor} focus:border-purple focus:outline-none focus:border-[1px] h-9 p-2 text-sm font-poppins font-medium ${inputOpacity} ${textCentered} placeholder-black placeholder-opacity-50`;
  return <input className={inputStyle} {...props} />;
}
