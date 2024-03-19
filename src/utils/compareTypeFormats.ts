import { ContentType } from "./getTypeFormats";

export function compareTypeFormats(obj1: any, variableType: ContentType) {
  switch (obj1.type) {
    case "int":
      return variableType !== "Integer";
    case "char":
      return variableType !== "Char";
    case "double":
      return variableType !== "Double";
    case "string":
      return variableType !== "String";
  }
  return true;
}
