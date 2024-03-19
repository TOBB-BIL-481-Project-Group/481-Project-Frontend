import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { getValidnessOfConstraints } from "../utils/getValidnessOfConstraints";
type DoublePopUpProps = {
  variableLetters: string[];
  closePopUp: () => void;
  changeSavedInputs: (e: any) => void;
  initializationValue?: any;
};
export function DoublePopUp({
  variableLetters,
  closePopUp,
  changeSavedInputs,
  initializationValue,
}: DoublePopUpProps) {
  const [leftLimit, setLeftLimit] = useState("");
  const [rightLimit, setRightLimit] = useState("");
  const [isPrecision, setIsPrecision] = useState(false);
  const [precisionAmount, setPrecisionAmount] = useState("");

  useEffect(() => {
    if (initializationValue === undefined) return;
    setLeftLimit(initializationValue.leftLimit);
    setRightLimit(initializationValue.rightLimit);
    setIsPrecision(initializationValue.isPrecision);
    setPrecisionAmount(initializationValue.precisionAmount);
  }, [initializationValue]);

  const completePopUp = () => {
    changeSavedInputs({
      type: "double",
      leftLimit: leftLimit,
      rightLimit: rightLimit,
      isPrecision: isPrecision,
      precisionAmount: precisionAmount,
    });
    closePopUp();
  };
  const isDisabled = useMemo(() => {
    if (isPrecision && precisionAmount.trim() === "") return true;
    const c1 = getValidnessOfConstraints(
      leftLimit,
      rightLimit,
      variableLetters,
      "double"
    );
    let fail = false;
    for (let i of precisionAmount) {
      if (!(i >= "0" && i <= "9")) {
        fail = true;
        break;
      }
    }

    const c2 =
      isPrecision &&
      (fail || parseInt(precisionAmount) > 16 || parseInt(precisionAmount) < 0);
    return c1 || c2;
  }, [leftLimit, rightLimit, variableLetters, isPrecision, precisionAmount]);
  return (
    <div className="w-[320px] h-fit bg-white border-[1px] border-blue rounded-lg drop-shadow-xl">
      <div className="flex flex-row items-center justify-center mt-6">
        <div className="w-[72px]">
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
        <div className="w-[72px] ml-3">
          <Input isTextCentered={true} value={"double"} disabled={true} />
        </div>
        <div className="ml-3">
          <Icon color="#0085FF" width="12" height="12" iconName="leq" />
        </div>
        <div className="w-[72px] ml-3">
          <Input
            isTextCentered={true}
            placeholder="Upper"
            value={rightLimit}
            onChange={(e) => setRightLimit(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row mt-4 justify-center items-center">
        <p className="font-poppins font-bold text-xs">Specific Precision?</p>
        <div className="ml-3">
          <Checkbox
            selected={isPrecision}
            onChange={() => setIsPrecision(!isPrecision)}
          />
        </div>
        {isPrecision && (
          <div className="w-10 ml-4">
            <Input
              isTextCentered={true}
              onChange={(e) => setPrecisionAmount(e.target.value)}
              value={precisionAmount}
            />
          </div>
        )}
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
              Create Double
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
