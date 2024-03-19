import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Button } from "./Button";
import { getValidnessOfConstraints } from "../utils/getValidnessOfConstraints";

type StringPopUpProps = {
  variableLetters: string[];
  changeSavedInputs: (e: any) => void;
  closePopUp: () => void;
  initializationValue?: any;
};
export function StringPopUp({
  variableLetters,
  changeSavedInputs,
  closePopUp,
  initializationValue,
}: StringPopUpProps) {
  const [charText, setCharText] = useState("");
  const [allowedChars, setAllowedChars] = useState([] as string[]);
  const charFeatures = ["Lowercase", "Uppercase", "Digits"];
  const stringFeatures = ["Palindrome", "Leading 0"];
  const [selectedCharFeatures, setSelectedCharFeatures] = useState(
    [] as string[]
  );
  const [selectedStringFeatures, setSelectedStringFeatures] = useState(
    [] as string[]
  );

  useEffect(() => {
    if (initializationValue === undefined) return;
    setLeftLimit(initializationValue.lowerBound);
    setRightLimit(initializationValue.upperBound);
    setSelectedCharFeatures(initializationValue.charFeatures);
    setAllowedChars(initializationValue.allowedChars);
    setSelectedStringFeatures(initializationValue.stringFeatures);
  }, [initializationValue]);

  const [leftLimit, setLeftLimit] = useState("");
  const [rightLimit, setRightLimit] = useState("");
  const expandAllowedChars = () => {
    const e = charText;
    if (allowedChars.filter((elem) => elem === e).length > 0) return;
    setAllowedChars([...allowedChars, e]);
    setCharText("");
  };

  const completePopUp = () => {
    changeSavedInputs({
      type: "string",
      lowerBound: leftLimit,
      upperBound: rightLimit,
      charFeatures: selectedCharFeatures,
      allowedChars: allowedChars,
      stringFeatures: selectedStringFeatures,
    });
    closePopUp();
  };

  const isDisabled = useMemo(() => {
    const c1 = getValidnessOfConstraints(
      leftLimit,
      rightLimit,
      variableLetters,
      "int"
    );
    if (c1) return true;
    const c2 =
      variableLetters.filter((e) => e === leftLimit).length === 0 &&
      parseInt(leftLimit) < 0;

    const c3 =
      variableLetters.filter((e) => e === rightLimit).length === 0 &&
      parseInt(rightLimit) < 0;

    const c4 =
      !Number.isNaN(parseInt(rightLimit)) && parseInt(rightLimit) > 1000000;
    return c2 || c3 || c4;
  }, [leftLimit, rightLimit, variableLetters]);

  return (
    <div className="w-[400px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl">
      <div className="flex flex-row justify-center items-center mt-5">
        <p className="font-poppins font-bold text-xs">String Length:</p>
        <div className="w-16 ml-3">
          <Input
            isTextCentered={true}
            placeholder="Lower"
            value={leftLimit}
            onChange={(e) => setLeftLimit(e.target.value)}
          />
        </div>
        <div className="ml-3">
          <Icon color="#0085FF" width="12" height="12" iconName="leq" />
        </div>
        <div className="w-12 ml-3">
          <Input isTextCentered={true} value={"|str|"} disabled={true} />
        </div>
        <div className="ml-3">
          <Icon color="#0085FF" width="12" height="12" iconName="leq" />
        </div>
        <div className="w-16 ml-3">
          <Input
            isTextCentered={true}
            placeholder="Upper"
            value={rightLimit}
            onChange={(e) => setRightLimit(e.target.value)}
          />
        </div>
      </div>
      <p className="font-poppins font-bold text-xs mt-4 text-center">
        Allowed Characters
      </p>
      <div className="flex flex-row mt-2 justify-center items-center">
        <div className="w-10">
          <Input
            isTextCentered={true}
            value={charText}
            onChange={(e) =>
              e.target.value.length <= 1 && setCharText(e.target.value)
            }
            disabled={allowedChars.length >= 5}
          />
        </div>
        <div className="ml-4" onClick={expandAllowedChars}>
          <Icon color="#5302FF" iconName="plus" height="24" width="24" />
        </div>
      </div>
      <div className="flex flex-row ml-4 mr-4 flex-wrap mt-3 justify-center items-center">
        {charFeatures.map((e, index) => (
          <div className={index === 0 ? "w-fit" : "w-fit ml-3"} key={index}>
            <Button
              buttonSize="small"
              buttonType={
                selectedCharFeatures.filter((elem) => elem === e).length > 0
                  ? "selected"
                  : "default"
              }
              onClick={() =>
                selectedCharFeatures.filter((elem) => e === elem).length > 0
                  ? setSelectedCharFeatures([
                    ...selectedCharFeatures.filter((elem) => e !== elem),
                  ])
                  : setSelectedCharFeatures([...selectedCharFeatures, e])
              }
            >
              {e}
            </Button>
          </div>
        ))}
      </div>
      {allowedChars.length > 0 && (
        <div className="flex flex-row ml-4 mr-4 flex-wrap mt-3 justify-center items-center">
          {allowedChars.map((e, index) => (
            <div key={index} className={index === 0 ? "w-fit" : "w-fit ml-3"}>
              <Button
                buttonSize="small"
                buttonType="selected"
                onClick={() =>
                  setAllowedChars([
                    ...allowedChars.filter((elem) => elem !== e),
                  ])
                }
              >
                {e}
              </Button>
            </div>
          ))}
        </div>
      )}
      <p className="font-poppins font-bold text-xs text-center mt-3">
        Features
      </p>
      <div className="flex flex-row flex-wrap mt-2 justify-center items-center">
        {stringFeatures.map((e, index) => (
          <div key={index} className={index === 0 ? "w-fit" : "w-fit ml-3"}>
            <Button
              buttonSize="small"
              buttonType={
                selectedStringFeatures.filter((elem) => elem === e).length > 0
                  ? "selected"
                  : "default"
              }
              onClick={() =>
                selectedStringFeatures.filter((elem) => e === elem).length > 0
                  ? setSelectedStringFeatures([
                    ...selectedStringFeatures.filter((elem) => e !== elem),
                  ])
                  : setSelectedStringFeatures([...selectedStringFeatures, e])
              }
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
            disabled={isDisabled}
          >
            <div>
              Create String
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
