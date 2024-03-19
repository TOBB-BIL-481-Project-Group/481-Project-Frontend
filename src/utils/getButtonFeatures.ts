import { ButtonSize, ButtonType } from "../ui/Button";

export function getButtonFeatures(
  buttonType: ButtonType,
  buttonSize: ButtonSize
) {
  let bgColor = "";
  let borderWidth = "border-0";
  let borderColor = "Black";
  let borderRadius = "rounded-full";
  let buttonHeight = "";
  let fontSize = "text-sm";
  let fontColor = "text-white";
  let opacityAmount = "opacity-60";
  switch (buttonType) {
    case "default":
      bgColor = "bg-white";
      borderWidth = "border-[1px]";
      borderColor = "border-black";
      fontColor = "text-black";
      opacityAmount = "opacity-30";
      break;
    case "black":
      bgColor = "bg-black";
      break;
    case "blue":
      bgColor = "bg-lightBlue";
      break;
    case "purple":
      bgColor = "bg-purple";
      break;
    case "red":
      bgColor = "bg-red";
      break;

    case "selected":
      bgColor = "bg-lightGreen";
      borderColor = "border-blue";
      borderWidth = "border-[1px]";
      break;
  }

  switch (buttonSize) {
    case "small":
      buttonHeight = "h-7";
      break;
    case "medium":
      buttonHeight = "h-8";
      break;
    case "large":
      buttonHeight = "h-9";
      break;
    case "xlarge":
      buttonHeight = "h-10";
      fontSize = "text-base";
      break;
  }

  return {
    bgColor: bgColor,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderRadius: borderRadius,
    buttonHeight: buttonHeight,
    fontSize: fontSize,
    fontColor: fontColor,
    opacityAmount: opacityAmount,
  };
}
