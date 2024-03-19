import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { LastInputStoreAtom } from "./LastInputStore";

export const useLastInput = (): any => {
  return useRecoilValue(LastInputStoreAtom);
};

export const useSetLastInput = (): SetterOrUpdater<any> => {
  return useSetRecoilState(LastInputStoreAtom);
};
