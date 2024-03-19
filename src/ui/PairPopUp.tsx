import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { Button } from "./Button";
import { ContentType, getTypeFormats } from "../utils/getTypeFormats";
import { IntegerPopUp } from "./IntegerPopUp";
import { CharPopUp } from "./CharPopUp";
import { DoublePopUp } from "./DoublePopUp";
import { StringPopUp } from "./StringPopUp";
import { compareTypeFormats } from "../utils/compareTypeFormats";

type PairPopUpProps = {
  variableLetters: string[];
  closePopUp: () => void;
  changeSavedInputs: (e: any) => void;
  initializationValue?: any;
};

export function PairPopUp({
  variableLetters,
  closePopUp,
  changeSavedInputs,
  initializationValue,
}: PairPopUpProps) {
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [type1, setType1] = useState("Select");
  const [type2, setType2] = useState("Select");
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const typeOptions = ["Integer", "Char", "Double", "String"];
  const features = ["1st=2nd", "1st<2nd", "1st>2nd"];
  const [selectedFeatures, setSelectedFeatures] = useState([] as string[]);
  const [content1Format, setContent1Format] = useState(
    getTypeFormats("Integer") as any
  );
  const [content2Format, setContent2Format] = useState(
    getTypeFormats("Integer") as any
  );
  const [isIntegerPopUpOpen, setIsIntegerPopUpOpen] = useState(false);
  const [isCharPopUpOpen, setIsCharPopUpOpen] = useState(false);
  const [isStringPopUpOpen, setIsStringPopUpOpen] = useState(false);
  const [isDoublePopUpOpen, setIsDoublePopUpOpen] = useState(false);
  const [isPopUp1Open, setIsPopUp1Open] = useState(false);

  const openPopUp = (
    e: string,
    isFirstOpening: boolean = false,
    popUpNo: number
  ) => {
    isFirstOpening &&
      (popUpNo === 1
        ? setContent1Format(getTypeFormats(e as ContentType))
        : setContent2Format(getTypeFormats(e as ContentType)));
    popUpNo === 1 && setIsPopUp1Open(true);

    !isFirstOpening &&
      (popUpNo === 1
        ? compareTypeFormats(content1Format, e as ContentType) &&
        setContent1Format(getTypeFormats(e as ContentType))
        : compareTypeFormats(content2Format, e as ContentType) &&
        setContent2Format(getTypeFormats(e as ContentType)));

    popUpNo === 1 && setIsPopUp1Open(true);

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
    }
  };
  const isAnyPopUpOpen = () => {
    return (
      isCharPopUpOpen ||
      isDoublePopUpOpen ||
      isStringPopUpOpen ||
      isStringPopUpOpen
    );
  };
  const isFeaturedisabled = (e: string) => {
    switch (e) {
      case "1st=2nd":
        return (
          type1 !== type2 ||
          selectedFeatures.find(
            (elem) => elem === "1st<2nd" || elem === "1st>2nd"
          ) !== undefined ||
          type1 === "Select" ||
          type2 === "Select"
        );

      case "1st<2nd":
        return (
          type1 !== type2 ||
          selectedFeatures.find(
            (elem) => elem === "1st=2nd" || elem === "1st>2nd"
          ) !== undefined ||
          type1 === "Select" ||
          type2 === "Select"
        );

      case "1st>2nd":
        return (
          type1 !== type2 ||
          selectedFeatures.find(
            (elem) => elem === "1st<2nd" || elem === "1st=2nd"
          ) !== undefined ||
          type1 === "Select" ||
          type2 === "Select"
        );
    }
    return false;
  };
  const completePopUp = () => {
    changeSavedInputs({
      type: "pair",
      firstContent: content1Format,
      secondContent: content2Format,
      features: selectedFeatures,
    });
    closePopUp();
  };
  useEffect(() => {
    if (initializationValue === undefined) return;
    setContent1Format(initializationValue.firstContent);
    setContent2Format(initializationValue.secondContent);
    setSelectedFeatures(initializationValue.features);
  }, [initializationValue]);
  const isCompleteButtonDisabled = () => {
    return type1 === "Select" || type2 === "Select";
  };
  return (
    <div className="w-full flex flex-row">
      <div className="w-[400px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl relative">
        <div className="flex flex-row mt-3 relative">
          <p className="font-poppins font-bold text-xs ml-[88px] mt-2">
            First Element:
          </p>
          <div className="w-20 absolute left-[188px] z-50">
            <Dropdown
              isOpen={isDropdown1Open}
              openMenu={() => {
                setIsDropdown1Open(true);
              }}
              closeMenu={() => {
                setIsDropdown1Open(false);
              }}
              options={typeOptions}
              selectedOption={type1}
              changeOption={(e: string) => {
                type1 === "Select" && openPopUp(e, true, 1);
                setType1(e);
                setIsDropdown1Open(false);
              }}
            />
          </div>
          <div className="ml-[116px] w-fit">
            <Button
              buttonSize="medium"
              buttonType="default"
              onClick={() => openPopUp(type1, false, 1)}
              disabled={
                isDropdown1Open ||
                isDropdown2Open ||
                isAnyPopUpOpen() ||
                type1 === "Select"
              }
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-row mt-4">
          <p className="font-poppins font-bold text-xs ml-[68px] mt-2">
            Second Element:
          </p>
          <div className="w-20 absolute left-[188px] z-40">
            <Dropdown
              isOpen={isDropdown2Open}
              openMenu={() => setIsDropdown2Open(true)}
              closeMenu={() => setIsDropdown2Open(false)}
              options={typeOptions}
              selectedOption={type2}
              changeOption={(e: string) => {
                type2 === "Select" && openPopUp(e, true, 2);
                setType2(e);
                setIsDropdown2Open(false);
              }}
            />
          </div>
          <div className="ml-[116px] w-fit">
            <Button
              buttonSize="medium"
              buttonType="default"
              onClick={() => openPopUp(type2, false, 2)}
              disabled={
                isDropdown2Open ||
                isDropdown1Open ||
                isAnyPopUpOpen() ||
                type2 === "Select"
              }
            >
              Edit
            </Button>
          </div>
        </div>
        <p className="font-poppins font-bold text-xs mt-4 text-center">
          Features
        </p>
        <div className="flex flex-row mx-2 flex-wrap items-center justify-center mt-3">
          {features.map((e, index) => (
            <div key={index} className={index === 0 ? "w-fit" : "w-fit ml-3"}>
              <Button
                buttonSize="small"
                buttonType={
                  selectedFeatures.find((elem) => elem === e) !== undefined
                    ? "selected"
                    : "default"
                }
                onClick={() =>
                  selectedFeatures.find((elem) => elem === e) !== undefined
                    ? setSelectedFeatures([
                      ...selectedFeatures.filter((elem) => elem !== e),
                    ])
                    : setSelectedFeatures([...selectedFeatures, e])
                }
                disabled={isFeaturedisabled(e)}
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
                Create Pair
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
            closePopUp={() => {
              setIsIntegerPopUpOpen(false);
              setIsPopUp1Open(false);
            }}
            variableLetters={variableLetters}
            changeSavedInputs={(e: any) =>
              isPopUp1Open ? setContent1Format(e) : setContent2Format(e)
            }
            initializationValue={isPopUp1Open ? content1Format : content2Format}
          />
        )}
        {isCharPopUpOpen && (
          <CharPopUp
            changeSavedInputs={(e: any) =>
              isPopUp1Open ? setContent1Format(e) : setContent2Format(e)
            }
            closePopUp={() => {
              setIsCharPopUpOpen(false);
              setIsPopUp1Open(false);
            }}
            initializationValue={isPopUp1Open ? content1Format : content2Format}
          />
        )}
        {isDoublePopUpOpen && (
          <DoublePopUp
            changeSavedInputs={(e: any) =>
              isPopUp1Open ? setContent1Format(e) : setContent2Format(e)
            }
            closePopUp={() => {
              setIsDoublePopUpOpen(false);
              setIsPopUp1Open(false);
            }}
            variableLetters={variableLetters}
            initializationValue={isPopUp1Open ? content1Format : content2Format}
          />
        )}
        {isStringPopUpOpen && (
          <StringPopUp
            changeSavedInputs={(e: any) =>
              isPopUp1Open ? setContent1Format(e) : setContent2Format(e)
            }
            closePopUp={() => {
              setIsStringPopUpOpen(false);
              setIsPopUp1Open(false);
            }}
            variableLetters={variableLetters}
            initializationValue={isPopUp1Open ? content1Format : content2Format}
          />
        )}
      </div>
    </div>
  );
}
