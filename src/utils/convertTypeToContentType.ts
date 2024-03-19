import { ContentType } from "./getTypeFormats";

export function convertTypeToContentType(e: string) {
  switch (e) {
    case "int":
      return "Integer" as ContentType;
    case "double":
      return "Double" as ContentType;
    case "char":
      return "Char" as ContentType;
    case "string":
      return "String" as ContentType;
    case "pair":
      return "Pair" as ContentType;
  }
  return "Integer" as ContentType;
}
