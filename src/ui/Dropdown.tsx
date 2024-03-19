import { DropdownItem } from "./DropdownItem";

type DropdownProps = {
  options: string[];
  selectedOption: string;
  isOpen: boolean;
  changeOption: (e: string) => void;
  openMenu: () => void;
  closeMenu: () => void;
  disabled?: boolean;
  disabledMenuItems?: string[];
};
export function Dropdown({
  options,
  selectedOption,
  isOpen,
  changeOption,
  openMenu,
  closeMenu,
  disabled,
  disabledMenuItems,
}: DropdownProps) {
  options = options.filter(
    (elem) =>
      disabledMenuItems === undefined ||
      disabledMenuItems?.find((elem2) => elem === elem2) === undefined
  );
  return (
    <div className="w-full flex flex-col">
      <DropdownItem
        content={selectedOption}
        isHeader={true}
        isBottom={options.length === 1}
        isOpen={isOpen}
        changeOption={changeOption}
        openMenu={openMenu}
        closeMenu={closeMenu}
        disabled={disabled}
      />
      {isOpen &&
        options.map((element, index) => (
          <DropdownItem
            key={index}
            content={element}
            isBottom={index === options.length - 1}
            isHeader={false}
            isOpen={isOpen}
            changeOption={changeOption}
            openMenu={openMenu}
            closeMenu={closeMenu}
            disabled={disabled}
          />
        ))}
    </div>
  );
}
