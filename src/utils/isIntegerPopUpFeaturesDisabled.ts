export function isIntegerPopUpFeaturesDisabled(
  e: string,
  selectedFeatures: string[],
  isNegative?: boolean
): boolean {
  switch (e) {
    case "Even":
      if (
        selectedFeatures.filter((e) => e === "Odd").length > 0 ||
        selectedFeatures.filter(
          (e) => e === "Not Prime" || e === "Factorial" || e === "Power of 2"
        ).length === 3
      )
        return true;
      return false;
    case "Odd":
      if (
        selectedFeatures.filter((e) => e === "Even").length > 0 ||
        (selectedFeatures.filter((e) => e === "Factorial" || e === "Power of 2")
          .length > 0 &&
          selectedFeatures.filter((e) => e === "Prime").length > 0)
      ) {
        return true;
      }
      return false;

    case "Prime":
      if (
        isNegative ||
        selectedFeatures.filter((e) => e === "Not Prime").length > 0 ||
        (selectedFeatures.filter((e) => e === "Factorial" || e === "Power of 2")
          .length >= 1 &&
          selectedFeatures.filter((e) => e === "Odd").length > 0)
      )
        return true;
      else return false;

    case "Not Prime":
      if (
        isNegative ||
        selectedFeatures.filter((e) => e === "Prime").length > 0 ||
        selectedFeatures.filter(
          (e) => e === "Even" || e === "Power of 2" || e === "Factorial"
        ).length === 3
      )
        return true;
      else return false;

    case "Factorial":
      if (
        selectedFeatures.filter((e) => e === "Prime" || e === "Odd").length ===
          2 ||
        selectedFeatures.filter(
          (e) => e === "Even" || e === "Power of 2" || e === "Not Prime"
        ).length === 3
      )
        return true;
      else return false;

    case "Power of 2":
      if (
        selectedFeatures.filter((e) => e === "Odd" || e === "Prime").length ===
          2 ||
        selectedFeatures.filter(
          (e) => e === "Even" || e === "Not Prime" || e === "Factorial"
        ).length === 3
      )
        return true;
      else return false;
  }
  return false;
}
