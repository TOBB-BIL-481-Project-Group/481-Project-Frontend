import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Button } from "./Button";

type CharPopUpProps = {
  changeSavedInputs: (e: any) => void;
  closePopUp: () => void;
  initializationValue?: any;
};
export function CharPopUp({
  changeSavedInputs,
  closePopUp,
  initializationValue,
}: CharPopUpProps) {
  const [charText, setCharText] = useState("");
  const features = ["Lowercase", "Uppercase", "Digits"];
  const [selectedFeatures, setSelectedFeatures] = useState([] as string[]);
  const [allowedChars, setAllowedChars] = useState([] as string[]);

  useEffect(() => {
    if (initializationValue === undefined) return;
    setSelectedFeatures(initializationValue.selectedFeatures);
    setAllowedChars(initializationValue.allowedChars);
  }, [initializationValue]);

  const expandAllowedChars = () => {
    const e = charText;
    if (allowedChars.filter((elem) => elem === e).length > 0) return;
    setAllowedChars([...allowedChars, e]);
    setCharText("");
  };

  const completePopUp = () => {
    changeSavedInputs({
      type: "char",
      selectedFeatures: selectedFeatures,
      allowedChars: allowedChars,
    });
    closePopUp();
  };

  return (
    <div className="w-[320px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl">
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
        {features.map((e, index) => (
          <div className={index === 0 ? "w-fit" : "w-fit ml-3"} key={index}>
            <Button
              buttonSize="small"
              buttonType={
                selectedFeatures.filter((elem) => elem === e).length > 0
                  ? "selected"
                  : "default"
              }
              onClick={() =>
                selectedFeatures.filter((elem) => e === elem).length > 0
                  ? setSelectedFeatures([
                    ...selectedFeatures.filter((elem) => e !== elem),
                  ])
                  : setSelectedFeatures([...selectedFeatures, e])
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
      <div className="flex flex-row w-full mt-6 mb-4 justify-center items-center">
        <div>
          <Button buttonSize="large" buttonType="red" onClick={completePopUp}>
            <div>
              Create Char
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
