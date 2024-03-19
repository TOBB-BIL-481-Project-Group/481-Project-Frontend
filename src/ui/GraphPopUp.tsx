import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "./Checkbox";
import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { getValidnessOfConstraints } from "../utils/getValidnessOfConstraints";

type GraphPopUpProps = {
  variableLetters: string[];
  closePopUp: () => void;
  changeSavedInputs: (e: any) => void;
};
export function GraphPopUp({
  variableLetters,
  closePopUp,
  changeSavedInputs,
}: GraphPopUpProps) {
  const [isTree, setIsTree] = useState(false);
  const [isNodeDropdownOpen, setIsNodeDropdownOpen] = useState(false);
  const [nodeCountSymbol, setNodeCountSymbol] = useState(" ");
  const [isIndexDropdownOpen, setIsIndexDropdownOpen] = useState(false);
  const [indexOption, setIndexOption] = useState("0-indexed");
  const possibleIndexOptions = ["0-indexed", "1-indexed"];
  const [isEdgeDropdownOpen, setIsEdgeDropdownOpen] = useState(false);
  const [edgeCountSymbol, setEdgeCountSymbol] = useState(" ");
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [leftLimit, setLeftLimit] = useState("");
  const [rightLimit, setRightLimit] = useState("");
  const graphFeatures = [
    "Acyclic",
    "Connected",
    "No Self Loop",
    "No Multiple Edges",
  ];
  const [selectedGraphFeatures, setSelectedGraphFeatures] = useState(
    [] as string[]
  );

  const setSelectedFeaturesFunction = (e: string) => {
    switch (e) {
      case "Acyclic":
        const preFeaturesNotDirected = selectedGraphFeatures.filter(
          (e) =>
            e !== "Acyclic" && e !== "No Self Loop" && e !== "No Multiple Edges"
        );
        const preFeaturesDirected = selectedGraphFeatures.filter(
          (e) => e !== "Acyclic" && e !== "No Self Loop"
        );
        isDirected
          ? setSelectedGraphFeatures([
            ...preFeaturesDirected,
            "Acyclic",
            "No Self Loop",
          ])
          : setSelectedGraphFeatures([
            ...preFeaturesNotDirected,
            "Acyclic",
            "No Self Loop",
            "No Multiple Edges",
          ]);
        break;

      case "No Self Loop":
      case "No Multiple Edges":
      case "Connected":
        setSelectedGraphFeatures([...selectedGraphFeatures, e]);
        break;
    }
  };
  const unselectGraphFeaturesFunction = (e: string) => {
    switch (e) {
      case "No Self Loop":
        selectedGraphFeatures.find((elem) => elem === "Acyclic") ===
          undefined &&
          setSelectedGraphFeatures([
            ...selectedGraphFeatures.filter((elem) => elem !== e),
          ]);
        break;
      case "No Multiple Edges":
        !(
          !isDirected &&
          selectedGraphFeatures.find((elem) => elem === "Acyclic") !== undefined
        ) &&
          setSelectedGraphFeatures([
            ...selectedGraphFeatures.filter((elem) => elem !== e),
          ]);
        break;
      default:
        setSelectedGraphFeatures([
          ...selectedGraphFeatures.filter((elem) => elem !== e),
        ]);
    }
  };

  const activateFunction = () => {
    isDirected &&
      selectedGraphFeatures.find((elem) => elem === "Acyclic") !== undefined &&
      selectedGraphFeatures.find((elem) => elem === "No Multiple Edges") ===
      undefined &&
      setSelectedGraphFeatures([...selectedGraphFeatures, "No Multiple Edges"]);

    setIsDirected(!isDirected);
  };

  useEffect(() => {
    setNodeCountSymbol(variableLetters.length > 0 ? variableLetters[0] : " ");
    setEdgeCountSymbol(variableLetters.length > 0 ? variableLetters[0] : " ");
  }, [variableLetters]);

  const isCompleteButtonDisabled = useMemo(() => {
    if (isWeighted) {
      const c1 = getValidnessOfConstraints(
        leftLimit,
        rightLimit,
        variableLetters,
        "int"
      );
      if (c1) return true;
    }
    return nodeCountSymbol === " " || edgeCountSymbol === " ";
  }, [
    leftLimit,
    rightLimit,
    variableLetters,
    nodeCountSymbol,
    edgeCountSymbol,
    isWeighted,
  ]);

  const completePopUp = () => {
    changeSavedInputs({
      type: isTree ? "tree" : "graph",
      nodeCountSymbol: nodeCountSymbol,
      edgeCountSymbol: edgeCountSymbol,
      indexStyle: indexOption,
      isDirected: isDirected,
      isWeighted: isWeighted,
      leftLimit: leftLimit,
      rightLimit: rightLimit,
      features: isTree ? [] : selectedGraphFeatures,
    });
    closePopUp();
  };
  return (
    <div className="w-[480px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl relative">
      <div className="flex flex-row justify-center items-center mt-4 relative">
        <p className="font-poppins font-bold text-xs">Is It Tree?</p>
        <div className="ml-4">
          <Checkbox selected={isTree} onChange={() => setIsTree(!isTree)} />
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <p
          className={`font-poppins font-bold text-xs mt-2 ${isTree ? "ml-32" : "ml-10"
            }`}
        >
          Node Count:
        </p>
        <div
          className={`w-fit ml-3 absolute ${isTree ? "left-52" : "left-[118px]"
            }`}
        >
          <Dropdown
            isOpen={isNodeDropdownOpen}
            changeOption={(e) => {
              setNodeCountSymbol(e);
              setIsNodeDropdownOpen(false);
            }}
            closeMenu={() => setIsNodeDropdownOpen(false)}
            openMenu={() => {
              nodeCountSymbol !== " " && setIsNodeDropdownOpen(true);
            }}
            options={variableLetters}
            selectedOption={nodeCountSymbol}
          />
        </div>
        <div
          className={`w-fit ml-4 absolute ${isTree ? "left-64" : "left-[168px]"
            }`}
        >
          <Dropdown
            isOpen={isIndexDropdownOpen}
            changeOption={(e) => {
              setIndexOption(e);
              setIsIndexDropdownOpen(false);
            }}
            closeMenu={() => setIsIndexDropdownOpen(false)}
            openMenu={() => setIsIndexDropdownOpen(true)}
            options={possibleIndexOptions}
            selectedOption={indexOption}
          />
        </div>
        {!isTree && (
          <p className="font-poppins font-bold text-xs mt-2 ml-[192px]">
            Edge Count:
          </p>
        )}
        {!isTree && (
          <div className="w-fit absolute right-10 left:auto">
            <Dropdown
              isOpen={isEdgeDropdownOpen}
              closeMenu={() => setIsEdgeDropdownOpen(false)}
              openMenu={() =>
                variableLetters.length > 0 && setIsEdgeDropdownOpen(true)
              }
              changeOption={(e: string) => {
                setEdgeCountSymbol(e);
                setIsEdgeDropdownOpen(false);
              }}
              options={variableLetters}
              selectedOption={edgeCountSymbol}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row mt-7 items-center justify-center">
        {!isTree && (
          <div className="flex flex-row">
            <p className="font-poppins font-bold text-xs">Is Directed?</p>
            <div className="ml-4">
              <Checkbox
                selected={isDirected}
                onChange={() => activateFunction()}
              />
            </div>
          </div>
        )}
        <p
          className={`font-poppins font-bold text-xs ${isTree ? "" : "ml-16"}`}
        >
          Is Weighted?
        </p>
        <div className="ml-4">
          <Checkbox
            selected={isWeighted}
            onChange={() => setIsWeighted(!isWeighted)}
          />
        </div>
      </div>
      {isWeighted && (
        <div className="mt-8 flex flex-row mx-4 items-center justify-center">
          <div className="w-28">
            <Input
              isTextCentered={true}
              value={leftLimit}
              placeholder="Lower Bound"
              onChange={(e) => setLeftLimit(e.target.value)}
            />
          </div>
          <div className="ml-3">
            <Icon color="#0085FF" width="12" height="12" iconName="leq" />
          </div>
          <div className="w-11 ml-3">
            <Input disabled={true} value={"w"} isTextCentered={true} />
          </div>
          <div className="ml-3">
            <Icon color="#0085FF" width="12" height="12" iconName="leq" />
          </div>
          <div className="w-28 ml-3">
            <Input
              isTextCentered={true}
              value={rightLimit}
              onChange={(e) => setRightLimit(e.target.value)}
              placeholder="Upper Bound"
            />
          </div>
        </div>
      )}
      {!isTree && (
        <div className="flex flex-row flex-wrap mt-3 mx-4 justify-center">
          {graphFeatures.map((e, index) => (
            <div
              className={index === 0 ? "w-fit mt-3" : "w-fit ml-3 mt-3"}
              key={index}
            >
              <Button
                buttonSize="small"
                buttonType={
                  selectedGraphFeatures.filter((elem) => elem === e).length > 0
                    ? "selected"
                    : "default"
                }
                onClick={() => {
                  selectedGraphFeatures.filter((elem) => elem === e).length > 0
                    ? unselectGraphFeaturesFunction(e)
                    : setSelectedFeaturesFunction(e);
                }}
              >
                {e}
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row w-full mt-6 mb-4 justify-center items-center">
        <div>
          <Button
            buttonSize="large"
            buttonType="red"
            onClick={completePopUp}
            disabled={isCompleteButtonDisabled}
          >
            <div>
              Create {isTree ? "Tree" : "Graph"}
            </div>
          </Button>
        </div>
        <div className="ml-2">
          <Button buttonSize="large" buttonType="black" onClick={closePopUp}>
            <div>
              Cancel
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
