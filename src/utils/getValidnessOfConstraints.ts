export function getValidnessOfConstraints(
  variableLeftLimit: string,
  variableRightLimit: string,
  variableLetters: string[],
  inputType: "int" | "double"
) {
  const isNanFunction = (e: string) => {
    return inputType === "int"
      ? Number.isNaN(parseInt(e))
      : Number.isNaN(parseFloat(e));
  };

  const compareNumbers = (a: string, b: string) => {
    return inputType === "int"
      ? parseInt(a) <= parseInt(b)
      : parseFloat(a) <= parseFloat(b);
  };
  const convertToNumber = (e: string) => {
    return inputType === "int" ? parseInt(e) : parseFloat(e);
  };
  const isDefinedVariableL =
    variableLetters.filter((e) => e === variableLeftLimit).length > 0;
  const isDefinedVariableR =
    variableLetters.filter((e) => e === variableRightLimit).length > 0;

  let fail = false;
  let dotCount = 0;
  for (let i = 0; i < variableLeftLimit.length; i++) {
    if (!(variableLeftLimit[i] >= "0" && variableLeftLimit[i] <= "9")) {
      if (variableLeftLimit[i] !== "-") {
        if (
          inputType === "double" &&
          variableLeftLimit[i] === "." &&
          dotCount === 0 &&
          i < variableLeftLimit.length - 1
        ) {
          dotCount++;
          continue;
        }
        fail = true;
        break;
      } else {
        if (i !== 0) {
          fail = true;
          break;
        }
      }
    }
  }

  if (!isDefinedVariableL && fail) return true;

  fail = false;

  dotCount = 0;

  for (let i = 0; i < variableRightLimit.length; i++) {
    if (!(variableRightLimit[i] >= "0" && variableRightLimit[i] <= "9")) {
      if (variableRightLimit[i] !== "-") {
        if (
          inputType === "double" &&
          variableRightLimit[i] === "." &&
          dotCount === 0 &&
          i < variableRightLimit.length - 1
        ) {
          dotCount++;
          continue;
        }
        fail = true;
        break;
      } else {
        if (i !== 0) {
          fail = true;
          break;
        }
      }
    }
  }
  if (!isDefinedVariableR && fail) return true;

  if (isDefinedVariableL) {
    if (isDefinedVariableR) return false;
    if (isNanFunction(variableRightLimit)) return true;
    if (
      convertToNumber(variableRightLimit) < -1e18 ||
      convertToNumber(variableRightLimit) > 1e18
    )
      return true;
    return false;
  } else {
    if (isNanFunction(variableLeftLimit)) return true;
    if (
      convertToNumber(variableLeftLimit) < -1e18 ||
      convertToNumber(variableLeftLimit) > 1e18
    )
      return true;
    if (isDefinedVariableR) return false;
    if (isNanFunction(variableRightLimit)) return true;
    if (
      convertToNumber(variableRightLimit) < -1e18 ||
      convertToNumber(variableRightLimit) > 1e18
    )
      return true;
    if (!compareNumbers(variableLeftLimit, variableRightLimit)) return true;
    return false;
  }
}
