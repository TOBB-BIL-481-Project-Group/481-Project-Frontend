import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ConstrainedVariableType } from "../react-query/types";
const { persistAtom } = recoilPersist();
export const LastInputStoreAtom = atom<any>({
  default: {
    savedInputs: [] as any[],
    testcaseLowerBound: "",
    testcaseUpperBound: "",
    variableLetters: [] as string[],
    variablesAllInOne: [] as any[],
    writtenVariables: [] as string[],
    sidebarString:
      "// This is an example testcase format!\n// Content might not match with yours!\n// First line represents testcase count\n5\n",
    constrainedVariables: [] as ConstrainedVariableType[],
  },
  key: "LastInput.Atom",
  effects_UNSTABLE: [persistAtom],
});
