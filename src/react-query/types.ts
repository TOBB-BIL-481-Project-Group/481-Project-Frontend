type packetTypes =
  | "int"
  | "array"
  | "char"
  | "double"
  | "string"
  | "pair"
  | "graph"
  | "tree"
  | "variable"
  | "newLine";
export type integerPacket = {
  type: packetTypes;
  lowerBound: string;
  upperBound: string;
  signProperties: string[];
  allowedIntegers: number[];
  selectedFeatues: string[];
};
export type variablePacket = {
  type: packetTypes;
  symbol: string;
  lowerBound: string;
  upperBound: string;
  signProperties: string[];
  allowedIntegers: number[];
  selectedFeatures: string[];
};

export type charPacket = {
  type: packetTypes;
  selectedFeatures: string[];
  allowedChars: string[];
};

export type doublePacket = {
  type: packetTypes;
  leftLimit: string;
  rightLimit: string;
  isPrecision: boolean;
  precisionAmount: number;
};

export type stringPacket = {
  type: packetTypes;
  lowerBound: string;
  upperBound: string;
  charFeatures: string[];
  allowedChars: string[];
  stringFeatures: string[];
};

export type basicPacketContent =
  | integerPacket
  | stringPacket
  | doublePacket
  | charPacket;

export type pairPacket = {
  type: packetTypes;
  firstType: basicPacketContent;
  secondType: basicPacketContent;
  features: string[];
};

export type advancedPacketContent = basicPacketContent | pairPacket;

export type dimensionTypes = "1-D" | "2-D";
export type indexTypes = "0-indexed" | "1-indexed";

export type arrayPacket = {
  type: packetTypes;
  dimension: dimensionTypes;
  size: string[];
  contentFormat: advancedPacketContent;
  features: string[];
};

export type graphPacket = {
  type: packetTypes;
  nodeCountSymbol: string;
  edgeCountSymbol: string;
  indexStyle: indexTypes;
  isDirected: boolean;
  isWeighted: boolean;
  leftLimit: string;
  rightLimit: string;
  features: string[];
};

export type newLinePacket = {
  type: packetTypes;
};

export type completeContentType =
  | advancedPacketContent
  | arrayPacket
  | graphPacket
  | newLinePacket;

export type ConstrainedVariableType = {
  symbol: string;
  sumValue: number;
};

export type completeTestcaseType = {
  content: completeContentType[];
  testcaseAmount: number[];
  constrainedVariables: ConstrainedVariableType[];
  allVariables: variablePacket[];
};

export type fileType = "txt" | "in" | "gir";
export type numberingType = "00" | "01" | "1" | "0";
export type fileFormatType = {
  amount: string;
  name: string;
  extension: fileType;
  numbering: numberingType;
};

export type completePacketType = {
  testcasePart: completeTestcaseType;
  filePart: fileFormatType;
};

export type outputCodeType = {
  userSpecificId: number;
  codeFile: FormData;
};
