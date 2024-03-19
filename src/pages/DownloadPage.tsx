import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useDeleteFileMutation, useFile } from "../react-query/hooks";
import { Loader } from "../ui/Loader";
import { PATHS } from "../consts/paths";
import "react-toastify/dist/ReactToastify.css";
import { useNotify } from "../hooks/useNotify";
import { AxiosError } from "axios";
import { LayoutPage } from "./LayoutPage";

export function DownloadPage() {
  const location = useLocation();
  const folderName = location.state.folderName;
  const { inputFile, isFetching, error } = useFile(folderName);
  const navigate = useNavigate();
  const notify = useNotify();

  const downloadFile = () => {
    const fileUrl = window.URL.createObjectURL(new Blob([inputFile]));
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "Test_Data.zip";
    a.type = "application/zip";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(fileUrl);
    document.body.removeChild(a);
    deleteFile();
  };

  const deleteFileMutation = useDeleteFileMutation({
    onSuccess: (res) => {
      console.log("Successfully deleted!");
      navigate(PATHS.createFile);
    },
    onError: (error) => {
      if (error) {
        console.log("Error: ", error.response.data);
      }
    },
  });

  const deleteFile = () => {
    deleteFileMutation.mutate(folderName);
  };

  if (isFetching) {
    return <Loader />;
  }
  if (
    error !== null &&
    (error as AxiosError).response !== null &&
    (error as AxiosError).response?.data !== null
  ) {
    notify.error((error as AxiosError).response?.data as string);
  }

  return (
    <LayoutPage>
      <div className="w-full items-center justify-center flex flex-col">
        <div className="mt-36 flex flex-col justify-center items-center">
          <p className="text-5xl font-poppins font-medium text-center">
            Your Inputs Are Ready!
          </p>
          <div className="w-fit mt-8">
            <Button
              buttonType="black"
              buttonSize="large"
              onClick={downloadFile}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}
