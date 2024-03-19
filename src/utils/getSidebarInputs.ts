import { megaAlphabet, stringAlphabet } from "../consts/alphabet";
import { ContentType } from "./getTypeFormats";

export function getSidebarInputs(
  e: ContentType | "Array" | "Graph" | "Tree",
  content1?: ContentType,
  content2?: ContentType,
  dimension?: string,
  arrayPairContent1?: ContentType,
  arrayPairContent2?: ContentType,
  zeroIndexed?: boolean,
  isGraphWeighted?: boolean
): string {
  const exampleChars = megaAlphabet;
  const exampleStrings = stringAlphabet;
  const produceRandomExamples = (e: ContentType): string => {
    switch (e) {
      case "Integer":
        return (Math.floor(Math.random() * 9) + 1).toString();
      case "Char":
        return exampleChars[
          Math.floor(Math.random() * exampleChars.length)
        ].toString();
      case "String":
        return exampleStrings[
          Math.floor(Math.random() * exampleStrings.length)
        ];
      case "Double":
        return (Math.random() * 10).toFixed(2).toString();
      case "Pair":
        return (
          produceRandomExamples(arrayPairContent1 as ContentType) +
          " " +
          produceRandomExamples(arrayPairContent2 as ContentType)
        );
    }
    return "";
  };
  let str1 = "";
  let str0 = "";
  switch (e) {
    case "Integer":
    case "Char":
    case "String":
    case "Double":
      return produceRandomExamples(e);
    case "Pair":
      return (
        produceRandomExamples(content1 as ContentType) +
        " " +
        produceRandomExamples(content2 as ContentType)
      );
    case "Array":
      if (dimension === "1-D") {
        const elementCount = Math.floor(Math.random() * 4) + 4;
        let str = "";
        for (let i = 1; i <= elementCount; i++) {
          str += produceRandomExamples(content1 as ContentType);
          if (content1 !== "Char" && i !== elementCount && content1 !== "Pair")
            str += " ";
          else if (content1 === "Pair" && i < elementCount) {
            str += "\n";
          }
        }
        return str;
      } else {
        const rowCount = Math.floor(Math.random() * 3) + 3;
        const colCount = Math.floor(Math.random() * 3) + 3;
        let str = "";
        for (let i = 1; i <= rowCount; i++) {
          for (let j = 1; j <= colCount; j++) {
            str += produceRandomExamples(content1 as ContentType);
            if (content1 !== "Char" && j !== colCount) str += " ";
          }
          if (i < rowCount) {
            str += "\n";
          }
        }
        return str;
      }
    case "Graph":
      if (!isGraphWeighted) {
        str1 = "1 2\n2 3\n3 4\n4 1";
        str0 = "0 1\n1 2\n2 3\n3 1";
      } else {
        str1 = "1 2 30\n2 3 10\n3 4 100\n4 1 50";
        str0 = "0 1 30\n1 2 10\n2 3 100\n3 1 50";
      }
      return zeroIndexed !== undefined && zeroIndexed ? str0 : str1;
    case "Tree":
      if (!isGraphWeighted) {
        str1 = "1 2\n2 3\n1 4\n1 5";
        str0 = "0 1\n1 2\n0 3\n0 4";
      } else {
        str1 = "1 2 75\n2 3 43\n1 4 37\n1 5 23";
        str0 = "0 1 67\n1 2 37\n0 3 42\n0 4 23";
      }
      return zeroIndexed !== undefined && zeroIndexed ? str0 : str1;
  }
}
