import { Icon } from "./Icon";

type CheckboxProps = {
  selected: boolean;
  onChange: () => void;
};
export function Checkbox({ selected, onChange }: CheckboxProps) {
  const bgColor = selected ? "bg-purple" : "bg-checkboxGray";
  const checkboxStyle = `w-5 h-5 ${bgColor} rounded flex items-center justify-center`;
  return (
    <div className={checkboxStyle} onClick={onChange}>
      {selected && (
        <div className="ml-0.5">
          <Icon color="#FFE710" iconName="tick" width="13" height="10" />
        </div>
      )}
    </div>
  );
}
