import { Icon } from "./Icon";

type DropdownItemProps = {
  isHeader: boolean;
  isOpen: boolean;
  isBottom: boolean;
  content: string;
  changeOption: (e: string) => void;
  openMenu: () => void;
  closeMenu: () => void;
  disabled?: boolean;
  zValue?: string;
};
export function DropdownItem({
  isHeader,
  isOpen,
  isBottom,
  content,
  changeOption,
  openMenu,
  closeMenu,
  disabled,
}: DropdownItemProps) {
  const fontColor = isHeader ? "text-purple" : "text-black";
  const fontPadding = "px-2 py-2";
  const contentStyle = `font-poppins font-medium text-xs ${fontColor} ${fontPadding}`;
  const borderWidth = isHeader
    ? "border-[1px]"
    : isBottom
    ? "border-x-[1px] border-b-[1px]"
    : "border-x-[1px]";
  const borderRadius = isHeader
    ? isOpen
      ? "rounded-t-2xl"
      : "rounded-full"
    : isBottom
    ? "rounded-b-2xl"
    : "rounded-none";

  const hoverBg = isHeader ? "hover:bg-white" : "hover:bg-yellow";
  const opacity = disabled ? "opacity-50" : "opacity-100";
  const rectangleStyle = `w-full h-8 bg-white flex flex-row border-purple ${hoverBg} ${borderWidth} ${borderRadius} ${opacity}`;
  const changeOptionFunction = () => {
    changeOption(content);
    if (isHeader && !isOpen && !disabled) {
      openMenu();
    }
    if (isHeader && isOpen) {
      closeMenu();
    }
  };
  return (
    <div className={rectangleStyle} onClick={changeOptionFunction}>
      <p className={contentStyle}>{content}</p>
      {isHeader && (
        <div className="flex ml-auto mr-2 items-center justify-center">
          <Icon
            iconName="dropdownSymbol"
            color="#5302FF"
            width="10"
            height="10"
          />
        </div>
      )}
    </div>
  );
}
