import { ComponentPropsWithoutRef, ReactElement, useState } from "react";
import { getButtonFeatures } from "../utils/getButtonFeatures";

export type ButtonType =
  | "default"
  | "selected"
  | "red"
  | "blue"
  | "black"
  | "purple";
export type ButtonSize = "small" | "medium" | "large" | "xlarge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  buttonType: ButtonType;
  buttonSize: ButtonSize;
}
export function Button({
  buttonType,
  buttonSize,
  children,
  ...props
}: ButtonProps) {
  const {
    bgColor,
    borderWidth,
    borderColor,
    borderRadius,
    buttonHeight,
    fontSize,
    fontColor
  } = getButtonFeatures(buttonType, buttonSize);
  const [buttonOpacity, setButtonOpacity] = useState("100%");
  const buttonStyle = `w-full ${bgColor} ${borderWidth} ${borderColor} ${borderRadius} ${buttonHeight} ${buttonOpacity}`;
  const textStyle = `${fontSize} ${fontColor} font-poppins font-medium px-2`;
  if ((children as ReactElement).type === undefined) {
    return (
      <button className={buttonStyle} {...props}>
        <p className={textStyle}>{children}</p>
      </button>
    );
  } else
    return (
      <button className={buttonStyle} style={{opacity:buttonOpacity}} onMouseOver={() => {setButtonOpacity("60%")}} onMouseLeave={() => {setButtonOpacity("100%")}} {...props}>
        <div className={textStyle}>{children}</div>
      </button>
    );
}
