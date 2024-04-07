type FormatSidebarProps = { sidebarString: string };
export function FormatSidebar({ sidebarString }: FormatSidebarProps) {
  const rows = [],
    rows2 = [];
  const separated = sidebarString.split("\n");
  let firstLineIndex = -1;
  if (sidebarString !== "") {
    for (let element of separated) rows.push(element);
  }
  for (let j = 0; j < rows.length; j++) {
    if (rows[j].length > 0 && rows[j][0] === "/" && rows[j][1] === "/") {
      firstLineIndex = j;
    }
    let tempStr = "";
    let element = rows[j];
    for (let i = 0; i < element.length; i++) {
      tempStr += element[i];
      if (element[i] === " " && i !== 0) tempStr += " ";
    }
    const trimmedString = tempStr.replace(/^\s+/, "");
    rows2.push(trimmedString);
  }

  return (
    <div className="w-full rounded-tl-lg rounded-bl-lg h-full overflow-auto" style={{backgroundColor:"darkblue"}}>
      <div className="flex flex-col pt-7">
        {rows2.map((element, index) => (
          <div
            key={index + 1}
            className={`ml-3 flex flex-row items-center ${
              index <= firstLineIndex ? "mb-4" : ""
            }`}
          >
            <div className="flex justify-center items-center ml-2 w-1">
              {index > firstLineIndex && (
                <p className="font-poppins font-bold text-xs text-blue">
                  {(index - firstLineIndex).toString()}
                </p>
              )}
            </div>
            <p
              className={`font-poppins font-bold text-xs ml-3 whitespace-pre pr-2 ${
                index > firstLineIndex ? "text-white" : "text-blue"
              }`}
            >
              {element}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
