import { completePacketType, outputCodeType } from "./types";
import { axios_instance } from "../react-query/index";

export const apiCreateFile = (data: completePacketType) => {
  return axios_instance({
    url: "/createFile",
    method: "post",
    data,
  });
};

export const apiUploadCode = (outputData: outputCodeType) => {
  return axios_instance({
    url: "/uploadCode/" + outputData.userSpecificId.toString(),
    method: "post",
    data: outputData.codeFile,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiGetFile = (folderName: string) => {
  return axios_instance({
    url: `/downloadFile/${folderName}`,
    method: "get",
    responseType: "blob",
  });
};

export const apiDeleteFile = (folderName: string) => {
  return axios_instance({
    url: `/deleteFile/${folderName}`,
    method: "delete",
  });
};

export const apisignup = (name: string,email: string,password:string,urls: string) => {
  return axios_instance({
    url: urls,
    method: "post",
    data: {
      name: name,
      email: email,
      password: password,
    }
  });
};