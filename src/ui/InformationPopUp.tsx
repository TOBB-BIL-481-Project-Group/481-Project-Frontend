import { useState } from "react";
import { Button } from "./Button";

export type InformationType =
  | "testcaseInterval"
  | "defineVariables"
  | "testcaseFormat"
  | "testcaseConstraints"
  | "fileFormat";
type InformationPopUpProps = {
  informationType: InformationType;
  close: () => void;
};
export function InformationPopUp({
  informationType,
  close,
}: InformationPopUpProps) {
  const types = [
    "Defined Variable",
    "Char",
    "Integer",
    "Double",
    "Pair",
    "Array",
    "Graph",
    "String",
  ];
  const [selectedType, setSelectedType] = useState("");
  const getTypeText = (e: string) => {
    switch (e) {
      case "Defined Variable":
        return (
          <p className="font-poppins font-bold text-xs">
            Defined Var. 1 - Select the one-letter symbol from the dropdown menu{" "}
            <br />
            Defined Var. 2 - Press to Create button to write defined variable to
            file
            <br />
            Defined Var. 3 - Don't forget; writing must needed to use variable
            in array or graph creation
            <br />
            Defined Var. 4 - In a testcase all values of the symbol such as
            (n,m) are same. e.g. when you write 'n' to the file many times its
            value is same within a testcase but it may differ in another
            testcases
          </p>
        );
      case "Char":
        return (
          <p className="font-poppins font-bold text-xs">
            Char 1 - Specific characters can be added <br />
            Char 2 - Specifically lowercase, uppercase, or digits can be allowed
            only if you want
          </p>
        );
      case "Integer":
        return (
          <p className="font-poppins font-bold text-xs">
            Int 1 - Enter lower and upper bounds (integer or registered symbol
            such as a, n, m) <br />
            Int 2 - Allow certain integers, determine sign properties, and
            select features
          </p>
        );
      case "Double":
        return (
          <p className="font-poppins font-bold text-xs">
            Double 1 - Enter lower and upper bounds (double or registered symbol
            such as a, n, m) <br />
            Double 2 - Select specific precision checkbox if you want fix number
            of digits after point
          </p>
        );
      case "Pair":
        return (
          <p className="font-poppins font-bold text-xs">
            Pair 1 - Select the type of first and second element and edit their
            contents
            <br />
            Pair 2 - Select features if you want, these features only works when
            1st and 2nd types are same
          </p>
        );
      case "Array":
        return (
          <p className="font-poppins font-bold text-xs">
            Array 1 - Select dimension and specify size (length or row & column)
            <br />
            Array 2 - For using registered symbols such as (n,m,...), they need
            to be written to the file first (Registering is not enough)
            <br />
            Array 3 - Select element type and edit its content
            <br />
            Array 4 - Select some array features if you want
          </p>
        );
      case "Graph":
        return (
          <p className="font-poppins font-bold text-xs">
            Graph 1 - Determine whether it is tree or not
            <br />
            Graph 2 - Select edge count and node count from written variables
            such as (n,a,x) by using dropdown menu
            <br />
            Graph 3 - Dropdown menu can seems empty if you don't have any
            written variables
            <br />
            Graph 4 - Select your index style
            <br />
            Graph 5 - Determine whether your graph is directed or weighted
            <br />
            Graph 6 - If you select weighted option, determine lower and upper
            bounds of weights (they can be integer or registered symbol such as
            (n,m))
            <br />
            Graph 7 - Determine features of the graph
          </p>
        );
      case "String":
        return (
          <p className="font-poppins font-bold text-xs">
            String 1 - Determine string length interval, upper and lower bounds
            can be integer or registered variables
            <br />
            String 2 - Select content features in the same way with char
            creation
            <br />
            String 3 - You can select additional string features
          </p>
        );
    }
  };
  return (
    <div className="w-fit flex flex-col h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl relative justify-center items-center p-4">
      {informationType === "testcaseInterval" && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-poppins font-bold text-sm mb-4">
            Testcase Interval Information
          </p>
          <p className="font-poppins font-bold text-xs">
            1 - Enter your lower and upper bound for testcase
            <br />2 - Both lower and upper bounds must be positive integer
          </p>
        </div>
      )}
      {informationType === "defineVariables" && (
        <div className="flex flex-col items-center justify-center max-w-[420px]">
          <p className="font-poppins font-bold text-sm mb-4">
            Variable Definition Information
          </p>
          <p className="font-poppins font-bold text-xs">
            1 - These variables are integer and have a symbol such as 'x', 'y',
            'z'
            <br />2 - Registered variables can be used in lower or upper bounds
            by typing their symbol names into fields
            <br />3 - To add first symbolic variable press to Add button
            <br />4 - In creation firstly select its one-letter symbol
            <br />5 - Secondly, determine its lower and upper bound (Here upper
            and lower bound can be integer and previous registered variables
            such as 'n', or 'a' if they exist)
            <br />6 - Finally, you can select its sign properties, another
            features, or allow only specific integers
          </p>
        </div>
      )}
      {informationType === "testcaseFormat" && (
        <div className="flex flex-col items-center justify-center max-w-[420px]">
          <p className="font-poppins font-bold text-sm mb-4">
            Testcase Format Information
          </p>
          <p className="font-poppins font-bold text-xs">
            1 - Select type and press to create button <br />2 - Finish Line
            button jumps to the one line below in your input file
            <br />3 - Reset Testcase button clears the testcase fields
            <br />4 - Undo Testcase button undos your last testcase format
            <br />5 - You can follow your testcase format from the side code
            panel
            <br />6 - Content might not match with yours please only look at the
            file and line format
          </p>
          <p className="font-poppins font-bold text-sm mt-4">
            Type Specific Information
          </p>
          <div className="flex flex-row flex-wrap mt-2 justify-center items-center px-8">
            {types.map((e, index) => (
              <div
                key={index}
                className={index === 0 ? "w-fit mt-2" : "w-fit ml-3 mt-2"}
              >
                <Button
                  buttonSize="small"
                  buttonType={selectedType === e ? "selected" : "default"}
                  onClick={() => setSelectedType(e)}
                >
                  {e}
                </Button>
              </div>
            ))}
          </div>
          {selectedType !== "" && (
            <div className="mt-4">{getTypeText(selectedType)}</div>
          )}
        </div>
      )}
      {informationType === "testcaseConstraints" && (
        <div className="flex flex-col items-center justify-center max-w-[420px]">
          <p className="font-poppins font-bold text-sm mb-4">
            Testcase Constraints Information
          </p>
          <p className="font-poppins font-bold text-xs">
            1 - Generally sum of some variables must be constrained
            <br />2 - To apply constraint to registered variable such as (n,m)
            you must write it to the file
            <br />3 - Input field only accepts integer value
          </p>
        </div>
      )}
      {informationType === "fileFormat" && (
        <div className="flex flex-col items-center justify-center max-w-[420px]">
          <p className="font-poppins font-bold text-sm mb-4">
            File Format Information
          </p>
          <p className="font-poppins font-bold text-xs">
            1 - Specify file amount (allows only integer)
            <br />2 - Determine file name (Letters and digits are allowed)
            <br />3 - Select file extension
            <br />4 - Select file numbering; e.g., 00 means file00.txt,
            file01.txt, etc.
          </p>
        </div>
      )}
      <div className="w-fit mt-3">
        <Button onClick={close} buttonSize="small" buttonType="black">
          <div>
            Close
          </div>
        </Button>
      </div>
    </div>
  );
}
