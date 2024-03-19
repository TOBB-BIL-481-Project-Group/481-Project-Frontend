import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateFile,
  apiDeleteFile,
  apiGetFile,
  apiUploadCode,
} from "./queries";
type CustomMutationProps = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

const defaultQueryOptions = { cacheTime: 0, refetchOnWindowFocus: false };

export const useCreateFileMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiCreateFile,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useCodeUploadMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUploadCode,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useFile = (folderName: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["file", folderName],
    queryFn: () => apiGetFile(folderName),
    ...defaultQueryOptions,
  });
  const inputFile: Blob = data?.data;
  return {
    inputFile: inputFile,
    isFetching: rest.isFetching,
    error: rest.error,
  };
};

export const useDeleteFileMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiDeleteFile,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};
