import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "./Dropdown";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Button } from "./Button";
import { isIntegerPopUpFeaturesDisabled } from "../utils/isIntegerPopUpFeaturesDisabled";
import { getValidnessOfConstraints } from "../utils/getValidnessOfConstraints";

type IntegerPopUpProps = {
  isVariable: boolean;
  options?: string[];
  variableLetters: string[];
  setVariablesArray?: (e: any) => void;
  setVariableLetterArray?: (e: string) => void;
  closePopUp: () => void;
  changeSavedInputs: (e: any) => void;
  initializationValue?: any;
};
export function IntegerPopUp({
  isVariable,
  options,
  variableLetters,
  setVariablesArray,
  setVariableLetterArray,
  closePopUp,
  changeSavedInputs,
  initializationValue,
}: IntegerPopUpProps) {
  const [variableLeftLimit, setVariableLeftLimit] = useState("");
  const [variableRightLimit, setVariableRightLimit] = useState("");
  const [isIntegerPopUpDropdownOpen, setIsIntegerPopUpDropdownOpen] =
    useState(false);

  const [allowedIntegerText, setAllowedIntegerText] = useState("");

  const [selectedVariable, setSelectedVariable] = useState("a");
  const signProperties = ["Any", "Positive", "Negative"];
  const [allowedIntegers, setAllowedIntegers] = useState([] as number[]);
  const [selectedSignProperties, setSelectedSignProperties] = useState([
    "Any",
  ] as string[]);
  const features = [
    "Even",
    "Odd",
    "Prime",
    "Not Prime",
    "Factorial",
    "Power of 2",
  ];
  const [selectedFeatures, setSelectedFeatures] = useState([] as string[]);

  useEffect(() => {
    if (initializationValue === undefined) return;
    setVariableLeftLimit(initializationValue.lowerBound);
    setVariableRightLimit(initializationValue.upperBound);
    setSelectedSignProperties(initializationValue.signProperties);
    setAllowedIntegers(initializationValue.allowedIntegers);
    setSelectedFeatures(initializationValue.selectedFeatures);
  }, [initializationValue]);

  const completePopUp = () => {
    if (
      isVariable &&
      setVariablesArray !== undefined &&
      setVariableLetterArray !== undefined
    ) {
      setVariablesArray({
        type: "variable",
        symbol: selectedVariable,
        lowerBound: variableLeftLimit,
        upperBound: variableRightLimit,
        signProperties: selectedSignProperties,
        allowedIntegers: allowedIntegers,
        selectedFeatures: selectedFeatures,
      });
      setVariableLetterArray(selectedVariable);
    } else {
      changeSavedInputs({
        type: "int",
        lowerBound: variableLeftLimit,
        upperBound: variableRightLimit,
        signProperties: selectedSignProperties,
        allowedIntegers: allowedIntegers,
        selectedFeatures: selectedFeatures,
      });
    }
    closePopUp();
  };

  const isCompleteButtonDisabled = useMemo(() => {
    const isConstraintsValid = getValidnessOfConstraints(
      variableLeftLimit,
      variableRightLimit,
      variableLetters,
      "int"
    );
    return isConstraintsValid;
  }, [variableLeftLimit, variableRightLimit, variableLetters]);
  useEffect(() => {
    isVariable && setSelectedVariable((options as string[])[0]);
  }, [options, isVariable]);

  const addToAllowedIntegers = () => {
    const nmbr = parseInt(allowedIntegerText);
    if (Number.isNaN(nmbr)) return;
    if (nmbr < -1e9 || nmbr > 1e9) return;
    if (allowedIntegers.filter((e) => e === nmbr).length > 0) return;
    setSelectedSignProperties([
      ...selectedSignProperties.filter((elem) => elem !== "Any"),
    ]);
    setAllowedIntegers([...allowedIntegers, nmbr]);
    setAllowedIntegerText("");
  };

  const changeSignProperties = (e: string) => {
    setSelectedSignProperties([e]);
    if (e === "Negative") {
      setSelectedFeatures([
        ...selectedFeatures.filter(
          (elem) => elem !== "Prime" && elem !== "Not Prime"
        ),
      ]);
    }
  };

  return (
    <div className="w-[432px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl relative">
      {isVariable && (
        <div className="flex flex-row mt-4 justify-center relative">
          <p className="font-poppins font-bold text-xs mr-7 mt-2">
            Symbol Letter:
          </p>
          <div className="w-12 absolute right-[108px]">
            <Dropdown
              changeOption={(e: string) => {
                setSelectedVariable(e);
                setIsIntegerPopUpDropdownOpen(false);
              }}
              options={options as string[]}
              isOpen={isIntegerPopUpDropdownOpen}
              openMenu={() => setIsIntegerPopUpDropdownOpen(true)}
              closeMenu={() => setIsIntegerPopUpDropdownOpen(false)}
              selectedOption={selectedVariable}
            />
          </div>
        </div>
      )}
      <div className="mt-5 flex flex-row mx-4 items-center justify-center">
        <div className="w-32">
          <Input
            isTextCentered={true}
            value={variableLeftLimit}
            placeholder="Lower Bound"
            onChange={(e) => setVariableLeftLimit(e.target.value)}
          />
        </div>
        <div className="ml-3">
          <Icon color="#0085FF" width="12" height="12" iconName="leq" />
        </div>
        <div className="w-12 ml-3">
          <Input
            disabled={true}
            value={isVariable ? selectedVariable : "int"}
            isTextCentered={true}
          />
        </div>
        <div className="ml-3">
          <Icon color="#0085FF" width="12" height="12" iconName="leq" />
        </div>
        <div className="w-32 ml-3">
          <Input
            isTextCentered={true}
            value={variableRightLimit}
            onChange={(e) => setVariableRightLimit(e.target.value)}
            placeholder="Upper Bound"
          />
        </div>
      </div>
      <p className="mt-4 font-poppins font-bold text-xs text-center">
        Allowed Integers
      </p>
      <div className="mt-3 flex flex-row items-center justify-center">
        <div className="w-16">
          <Input
            isTextCentered={true}
            value={allowedIntegerText}
            onChange={(e) => setAllowedIntegerText(e.target.value)}
            disabled={allowedIntegers.length >= 5}
          />
        </div>
        <div className="ml-4" onClick={addToAllowedIntegers}>
          <Icon color="#5302FF" iconName="plus" height="24" width="24" />
        </div>
      </div>
      <div className="flex flex-row justify-center mt-3">
        {signProperties.map((e: string, index) => (
          <div
            className={index !== 0 ? "ml-4 w-fit" : "ml-0 w-fit"}
            key={index}
          >
            <Button
              buttonSize="small"
              buttonType={
                selectedSignProperties.filter((element) => e === element)
                  .length === 0
                  ? "default"
                  : "selected"
              }
              onClick={() => {
                selectedSignProperties.filter((element) => e === element)
                  .length === 0
                  ? e === "Any"
                    ? allowedIntegers.length === 0 &&
                    setSelectedSignProperties(["Any"])
                    : changeSignProperties(e)
                  : e !== "Any" && selectedSignProperties.length === 1
                    ? allowedIntegers.length === 0
                      ? setSelectedSignProperties(["Any"])
                      : setSelectedSignProperties([])
                    : e !== "Any" &&
                    setSelectedSignProperties(
                      selectedSignProperties.filter((element) => element !== e)
                    );
              }}
            >
              {e}
            </Button>
          </div>
        ))}
      </div>
      {allowedIntegers.length !== 0 && (
        <div className="flex flex-row justify-center flex-wrap ml-4 mr-4">
          {allowedIntegers.map((e: number, index) => (
            <div
              className={index !== 0 ? "ml-4 w-fit mt-3" : "w-fit mt-3"}
              key={index}
            >
              <Button
                buttonSize="small"
                buttonType="selected"
                onClick={() => {
                  if (allowedIntegers.length === 1) {
                    selectedSignProperties.length === 0 &&
                      setSelectedSignProperties(["Any"]);
                  }
                  setAllowedIntegers([
                    ...allowedIntegers.filter((element) => element !== e),
                  ]);
                }}
              >
                {e}
              </Button>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 font-poppins font-bold text-xs flex justify-center">
        Features
      </p>
      <div className="flex flex-row justify-center ml-8 mr-8 flex-wrap">
        {features.map((e, index) => (
          <div
            className={index === 0 ? "w-fit mt-3" : "w-fit ml-3 mt-3"}
            key={index}
          >
            <Button
              buttonSize="small"
              buttonType={
                selectedFeatures.filter((elem) => e === elem).length === 0
                  ? "default"
                  : "selected"
              }
              onClick={() => {
                selectedFeatures.filter((elem) => e === elem).length === 0
                  ? setSelectedFeatures([...selectedFeatures, e])
                  : setSelectedFeatures([
                    ...selectedFeatures.filter((elem) => elem !== e),
                  ]);
              }}
              disabled={isIntegerPopUpFeaturesDisabled(
                e,
                selectedFeatures,
                selectedSignProperties.find((elem) => elem === "Negative") !==
                undefined
              )}
            >
              {e}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-row w-full mt-9 mb-4 justify-center items-center">
        <div>
          <Button
            buttonSize="large"
            buttonType="red"
            disabled={isCompleteButtonDisabled}
            onClick={completePopUp}
          >
            <div>
              {isVariable ? "Define Variable" : "Create Integer"}
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
