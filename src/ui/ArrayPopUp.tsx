import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { Button } from "./Button";
import { ContentType, getTypeFormats } from "../utils/getTypeFormats";
import { IntegerPopUp } from "./IntegerPopUp";
import { CharPopUp } from "./CharPopUp";
import { DoublePopUp } from "./DoublePopUp";
import { StringPopUp } from "./StringPopUp";
import { PairPopUp } from "./PairPopUp";

type ArrayPopUpProps = {
  variableLetters: string[];
  closePopUp: () => void;
  changeSavedInputs: (e: any) => void;
};

export function ArrayPopUp({
  variableLetters,
  closePopUp,
  changeSavedInputs,
}: ArrayPopUpProps) {
  const [isDimensionDropdownOpen, setIsDimensionDropdownOpen] = useState(false);
  const [dimension, setDimension] = useState("1-D");
  const [isElementDropdownOpen, setIsElementDropdownOpen] = useState(false);
  const [elementType, setElementType] = useState("Select");
  const [length, setLength] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");

  const contentTypes = ["Integer", "Char", "Double", "String", "Pair"];
  const arrayFeatures = [
    "Sorted (Ascending)",
    "Sorted (Descending)",
    "Single Element",
    "Permutation",
    "Unique Elements",
  ];

  const [contentFormat, setContentFormat] = useState(
    getTypeFormats("Integer") as any
  );
  const [isIntegerPopUpOpen, setIsIntegerPopUpOpen] = useState(false);
  const [isCharPopUpOpen, setIsCharPopUpOpen] = useState(false);
  const [isStringPopUpOpen, setIsStringPopUpOpen] = useState(false);
  const [isDoublePopUpOpen, setIsDoublePopUpOpen] = useState(false);
  const [isPairPopUpOpen, setIsPairPopUpOpen] = useState(false);
  const [shownElementType, setShownElementType] = useState("Select");
  const [selectedArrayFeatures, setSelectedArrayFeatures] = useState(
    [] as string[]
  );
  const openPopUp = (e: string, isFirstOpening: boolean = false) => {
    if (e === "Select") return;
    (isFirstOpening || e !== elementType) &&
      setContentFormat(getTypeFormats(e as ContentType));
    setElementType(e);
    switch (e) {
      case "Integer":
        setIsIntegerPopUpOpen(true);
        break;
      case "Char":
        setIsCharPopUpOpen(true);
        break;
      case "Double":
        setIsDoublePopUpOpen(true);
        break;
      case "String":
        setIsStringPopUpOpen(true);
        break;
      case "Pair":
        setIsPairPopUpOpen(true);
        break;
    }
  };

  const isFeatureDisabled = (e: string) => {
    switch (e) {
      case "Sorted (Ascending)":
        if (
          shownElementType === "String" ||
          shownElementType === "Char" ||
          dimension === "2-D"
        )
          return true;
        return (
          selectedArrayFeatures.find(
            (elem) => elem === "Sorted (Descending)" || elem === "Permutation"
          ) !== undefined
        );

      case "Sorted (Descending)":
        if (
          shownElementType === "String" ||
          shownElementType === "Char" ||
          dimension === "2-D"
        )
          return true;
        return (
          selectedArrayFeatures.find(
            (elem) => elem === "Sorted (Ascending)" || elem === "Permutation"
          ) !== undefined
        );
      case "Single Element":
        return (
          selectedArrayFeatures.find(
            (elem) => elem === "Permutation" || elem === "Unique Elements"
          ) !== undefined
        );

      case "Permutation":
        if (
          (shownElementType !== "Integer" && shownElementType !== "Select") ||
          dimension === "2-D"
        )
          return true;
        return (
          selectedArrayFeatures.find(
            (elem) =>
              elem === "Single Element" ||
              elem === "Sorted (Ascending)" ||
              elem === "Sorted (Descending)"
          ) !== undefined
        );

      case "Unique Elements":
        return (
          selectedArrayFeatures.find((elem) => elem === "Single Element") !==
          undefined
        );
    }
  };
  const disableArrayFeatures = (e: string) => {
    if (e === "Char" || e === "String") {
      setSelectedArrayFeatures([
        ...selectedArrayFeatures.filter(
          (elem) =>
            elem !== "Sorted (Ascending)" &&
            elem !== "Sorted (Descending)" &&
            elem !== "Permutation"
        ),
      ]);
    } else if (e === "Double" || e === "Pair") {
      setSelectedArrayFeatures([
        ...selectedArrayFeatures.filter((elem) => elem !== "Permutation"),
      ]);
    }
  };
  const isValidText = (e: string) => {
    if (variableLetters.find((elem) => e === elem) !== undefined) return true;
    for (let i of e) {
      if (!(i >= "0" && i <= "9")) return false;
    }
    let nmbr = parseInt(e);
    if (Number.isNaN(nmbr)) return false;
    if (e.trim() === "") return false;
    if (nmbr <= 0 || nmbr >= 10000000) return false;
    return true;
  };
  const isAnyPopUpOpen = () => {
    return (
      isCharPopUpOpen ||
      isDoublePopUpOpen ||
      isIntegerPopUpOpen ||
      isStringPopUpOpen ||
      isPairPopUpOpen
    );
  };
  const isCompleteButtonDisabled = () => {
    if (shownElementType === "Select" || isAnyPopUpOpen()) return true;
    return !(dimension === "1-D"
      ? isValidText(length)
      : isValidText(row) && isValidText(col));
  };

  const completePopUp = () => {
    changeSavedInputs({
      type: "array",
      dimension: dimension,
      size: dimension === "1-D" ? [length] : [row, col],
      contentFormat: contentFormat,
      features: selectedArrayFeatures,
    });
    closePopUp();
  };

  return (
    <div className="w-full flex flex-row">
      <div className="w-[480px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl relative">
        <div className="flex flex-row mt-4 relative">
          <p
            className={`font-poppins font-bold text-xs mt-2 ${dimension === "1-D" ? "ml-[76px]" : "ml-5"
              }`}
          >
            Dimension:
          </p>
          <div
            className={`${dimension === "1-D" ? "left-[156px]" : "left-[104px]"
              } absolute z-50`}
          >
            <Dropdown
              openMenu={() => setIsDimensionDropdownOpen(true)}
              closeMenu={() => setIsDimensionDropdownOpen(false)}
              options={["1-D", "2-D"]}
              changeOption={(e) => {
                setDimension(e);
                setIsDimensionDropdownOpen(false);
              }}
              selectedOption={dimension}
              isOpen={isDimensionDropdownOpen}
              disabledMenuItems={shownElementType === "Pair" ? ["2-D"] : []}
            />
          </div>
          {dimension === "1-D" && (
            <div className="flex flex-row ml-20">
              <p className="font-poppins font-bold text-xs mt-2">Length:</p>
              <div className="w-32 ml-3">
                <Input
                  isTextCentered={true}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
            </div>
          )}
          {dimension === "2-D" && (
            <div className="flex flex-row ml-[84px]">
              <p className="font-poppins font-bold text-xs mt-2">Row:</p>
              <div className="ml-4 w-20">
                <Input
                  isTextCentered={true}
                  value={row}
                  onChange={(e) => setRow(e.target.value)}
                />
              </div>
              <p className="font-poppins font-bold text-xs mt-2 ml-3">
                Column:
              </p>
              <div className="ml-4 w-20">
                <Input
                  isTextCentered={true}
                  value={col}
                  onChange={(e) => setCol(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row mt-6 ml-20">
          <p className="font-poppins font-bold text-xs mt-2">Element Type:</p>
          <div className="w-20 absolute left-[188px] z-40">
            <Dropdown
              disabled={isAnyPopUpOpen()}
              options={contentTypes}
              isOpen={isElementDropdownOpen}
              closeMenu={() => setIsElementDropdownOpen(false)}
              changeOption={(e) => {
                setIsElementDropdownOpen(false);
                setShownElementType(e);
                disableArrayFeatures(e);
                elementType === "Select" && openPopUp(e, true);
              }}
              openMenu={() => setIsElementDropdownOpen(true)}
              selectedOption={shownElementType}
              disabledMenuItems={dimension === "2-D" ? ["Pair"] : []}
            />
          </div>
          <div className="w-fit ml-[120px]">
            <Button
              buttonSize="medium"
              buttonType="default"
              onClick={() => openPopUp(shownElementType)}
              disabled={isElementDropdownOpen}
            >
              Edit Elements
            </Button>
          </div>
        </div>
        <p className="font-poppins font-bold text-xs mt-5 text-center">
          Array Features
        </p>
        <div className="mt-2 flex flex-row flex-wrap mx-2 items-center justify-center">
          {arrayFeatures.map((e, index) => (
            <div
              className={index === 0 ? "w-fit mt-3" : "w-fit ml-3 mt-3"}
              key={index}
            >
              <Button
                buttonSize="small"
                buttonType={
                  selectedArrayFeatures.find((elem) => e === elem) !== undefined
                    ? "selected"
                    : "default"
                }
                onClick={() => {
                  setSelectedArrayFeatures(
                    selectedArrayFeatures.find((elem) => elem === e) !==
                      undefined
                      ? [...selectedArrayFeatures.filter((elem) => elem !== e)]
                      : [...selectedArrayFeatures, e]
                  );
                }}
                disabled={isFeatureDisabled(e)}
              >
                {e}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-row w-full mt-6 mb-4 justify-center items-center">
          <div>
            <Button
              buttonSize="large"
              buttonType="red"
              onClick={completePopUp}
              disabled={isCompleteButtonDisabled()}
            >
              <div>
                Create Array
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
      <div className="ml-4">
        {isIntegerPopUpOpen && (
          <IntegerPopUp
            isVariable={false}
            closePopUp={() => setIsIntegerPopUpOpen(false)}
            variableLetters={variableLetters}
            changeSavedInputs={(e: any) => setContentFormat(e)}
            initializationValue={contentFormat}
          />
        )}
        {isCharPopUpOpen && (
          <CharPopUp
            changeSavedInputs={(e: any) => setContentFormat(e)}
            closePopUp={() => setIsCharPopUpOpen(false)}
            initializationValue={contentFormat}
          />
        )}
        {isDoublePopUpOpen && (
          <DoublePopUp
            changeSavedInputs={(e: any) => setContentFormat(e)}
            closePopUp={() => setIsDoublePopUpOpen(false)}
            variableLetters={variableLetters}
            initializationValue={contentFormat}
          />
        )}
        {isStringPopUpOpen && (
          <StringPopUp
            changeSavedInputs={(e: any) => setContentFormat(e)}
            closePopUp={() => setIsStringPopUpOpen(false)}
            variableLetters={variableLetters}
            initializationValue={contentFormat}
          />
        )}
        {isPairPopUpOpen && (
          <PairPopUp
            variableLetters={variableLetters}
            closePopUp={() => setIsPairPopUpOpen(false)}
            changeSavedInputs={(e: any) => setContentFormat(e)}
            initializationValue={contentFormat}
          />
        )}
      </div>
    </div>
  );
}
