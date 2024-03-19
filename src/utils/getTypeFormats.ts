export type ContentType = "String" | "Integer" | "Char" | "Double" | "Pair";
export function getTypeFormats(contentType: ContentType) {
  switch (contentType) {
    case "Char":
      return {
        type: "char",
        selectedFeatures: [],
        allowedChars: [],
      };

    case "String":
      return {
        type: "string",
        lowerBound: "1",
        upperBound: "10000",
        charFeatures: [],
        allowedChars: [],
        stringFeatures: [],
      };

    case "Double":
      return {
        type: "double",
        leftLimit: "1",
        rightLimit: "10000",
        isPrecision: false,
        precisionAmount: "",
      };
    case "Integer":
      return {
        type: "int",
        lowerBound: "1",
        upperBound: "10000",
        signProperties: [],
        allowedIntegers: [],
        selectedFeatures: [],
      };
    case "Pair":
      return {
        type: "pair",
        firstContent: {
          type: "int",
          lowerBound: "1",
          upperBound: "10000",
          signProperties: [],
          allowedIntegers: [],
          selectedFeatures: [],
        },
        secondContent: {
          type: "int",
          lowerBound: "1",
          upperBound: "10000",
          signProperties: [],
          allowedIntegers: [],
          selectedFeatures: [],
        },
        features: [],
      };
  }
}
