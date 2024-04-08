import { useEffect, useMemo, useState } from "react";
import { shortVariableAlphabet } from "../consts/alphabet";
import { Icon } from "../ui/Icon";
import { Input } from "../ui/Input";
import { IntegerPopUp } from "../ui/IntegerPopUp";
import { Dropdown } from "../ui/Dropdown";
import { VariableType, variableTypes } from "../consts/variableTypes";
import { Button } from "../ui/Button";
import { CharPopUp } from "../ui/CharPopUp";
import { StringPopUp } from "../ui/StringPopUp";
import { GraphPopUp } from "../ui/GraphPopUp";
import { DoublePopUp } from "../ui/DoublePopUp";
import { ArrayPopUp } from "../ui/ArrayPopUp";
import { PairPopUp } from "../ui/PairPopUp";
import { FormatSidebar } from "../ui/FormatSidebar";
import { getSidebarInputs } from "../utils/getSidebarInputs";
import { convertTypeToContentType } from "../utils/convertTypeToContentType";
import {
  useCodeUploadMutation,
  useCreateFileMutation,
} from "../react-query/hooks";
import { fileType, numberingType } from "../react-query/types";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import { Loader } from "../ui/Loader";
import { useNotify } from "../hooks/useNotify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutPage } from "./LayoutPage";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaUndo, FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import {
  useLastInput,
  useSetLastInput,
} from "../recoil-store/LastInputStoreHooks";
import { InformationPopUp, InformationType } from "../ui/InformationPopUp";
import { HiInformationCircle } from "react-icons/hi";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
type ConstrainedVariableType = {
  symbol: string;
  sumValue: number;
};

export function MainPage() {
  const USERNAME = localStorage.getItem("currentUser");
  const [testCaseHide, setTestCaseHide] = useState(true);
  const [defineIntegerHide, setDefineIntegerHide] = useState(true);
  const [testCaseFormatHide, setTestCaseFormatHide] = useState(true);
  const [constraintsHide, setConstraintsHide] = useState(true);
  const [fileFormatHide, setFileFormatHide] = useState(true);

  const [variableLetters, setVariableLetters] = useState([] as string[]);
  const [variablesAllInOne, setVariablesAllInOne] = useState([] as any[]);
  const [savedInputs, setSavedInputs] = useState([] as any[]);
  const variableLetterOptions: string[] = shortVariableAlphabet;
  const [testcaseLowerBound, setTestcaseLowerBound] = useState("");
  const [testcaseUpperBound, setTestcaseUpperBound] = useState("");
  const [isIntegerPopUpOpen, setIsIntegerPopUpOpen] = useState(false);
  const [isCharPopUpOpen, setIsCharPopUpOpen] = useState(false);
  const [isStringPopUpOpen, setIsStringPopUpOpen] = useState(false);
  const [isGraphPopUpOpen, setIsGraphPopUpOpen] = useState(false);
  const [isDoublePopUpOpen, setIsDoublePopUpOpen] = useState(false);
  const [isArrayPopUpOpen, setIsArrayPopUpOpen] = useState(false);
  const [isPairPopUpOpen, setIsPairPopUpOpen] = useState(false);
  const [isVarDDOpen, setIsVarDDOpen] = useState(false);
  const [selectedVar, setSelectedVar] = useState("Integer");
  const [isVarSymbolDDOpen, setIsVarSymbolDDOpen] = useState(false);
  const [varSymbolDD, setVarSymbolDD] = useState("");
  const [writtenVariables, setWrittenVariables] = useState([] as string[]);
  const navigate = useNavigate();
  const notify = useNotify();
  const lastInput = useLastInput();
  const setLastInput = useSetLastInput();
  const [isTutorialPopUpOpen, setIsTutorialPopUpOpen] = useState(false);
  const [tutorialType, setTutorialType] = useState(
    "testcaseInterval" as InformationType
  );
  const [codeFile, setCodeFile] = useState<File | null>(null);

  const openTutorialPopUp = (e: InformationType) => {
    setIsTutorialPopUpOpen(true);
    setTutorialType(e);
  };

  const saveLastInput = (e: any) => {
    setLastInput(e);
  };

  const createFileMutation = useCreateFileMutation({
    onSuccess: (res) => {
      saveLastInput({
        savedInputs: savedInputs,
        testcaseLowerBound: testcaseLowerBound,
        testcaseUpperBound: testcaseUpperBound,
        variableLetters: variableLetters,
        variablesAllInOne: variablesAllInOne,
        writtenVariables: writtenVariables,
        sidebarString: sidebarString,
        constrainedVariables: constrainedVariables,
      });
      uploadCodeFile(res.data);
    },
    onError: (error) => {
      if (error) {
        console.log(error.response);
        if (error.response === undefined) {
          notify.error(error.message);
        } else {
          notify.error(error.response.data);
          console.log("Error: ", error.response.data);
        }
      }
    },
  });

  const codeUploadMutation = useCodeUploadMutation({
    onSuccess: (res) => {
      notify.success("Code is uploaded");
      navigate(PATHS.downloadFile, { state: { folderName: res.data } });
    },
    onError: (error) => {
      if (error) {
        console.log(error.response);
        if (error.response === undefined) {
          notify.error(error.message);
        } else {
          notify.error(error.response.data);
          console.log("Error: ", error.response.data);
        }
      }
    },
  });

  const uploadCodeFile = (userSpecificId: number) => {
    if (codeFile === null) {
      notify.error("Output code is not given");
      return;
    }
    const formData = new FormData();
    formData.append("codeFile", codeFile);
    codeUploadMutation.mutate({
      userSpecificId: userSpecificId,
      codeFile: formData,
    });
  };

  const createFile = () => {
    if (codeFile === null) {
      notify.error("Output code is not given");
      return;
    }
    createFileMutation.mutate({
      filePart: {
        amount: fileAmount,
        extension: fileExtension as fileType,
        name: fileName,
        numbering: numbering as numberingType,
      },
      testcasePart: {
        testcaseAmount: [
          parseInt(testcaseLowerBound),
          parseInt(testcaseUpperBound),
        ],
        constrainedVariables: constrainedVariables,
        content: savedInputs,
        allVariables: variablesAllInOne,
      },
    });
  };

  const foundInVariables = (str: string) => {
    for (let i = 0; i < variableLetters.length; i++) {
      if (variableLetters[i] === str) return false;
    }
    return true;
  };
  useEffect(() => {
    variableLetters.length > 0 && setVarSymbolDD(variableLetters[0]);
  }, [variableLetters]);

  const openPopUp = (e: VariableType) => {
    switch (e) {
      case "Integer":
        setIsIntegerPopUpOpen(true);
        break;
      case "Array":
        setIsArrayPopUpOpen(true);
        break;
      case "Char":
        setIsCharPopUpOpen(true);
        break;
      case "Defined Variable":
        setSavedInputs([
          ...savedInputs,
          variablesAllInOne.filter((elem) => elem.symbol === varSymbolDD)[0],
        ]);

        writtenVariables.find((e) => e === varSymbolDD) === undefined &&
          setWrittenVariables([...writtenVariables, varSymbolDD]);
        break;
      case "Double":
        setIsDoublePopUpOpen(true);
        break;
      case "Graph":
        setIsGraphPopUpOpen(true);
        break;
      case "Pair":
        setIsPairPopUpOpen(true);
        break;
      case "String":
        setIsStringPopUpOpen(true);
        break;
    }
  };
  const resetTestCase = () => {
    saveLastInput({
      savedInputs: savedInputs,
      testcaseLowerBound: testcaseLowerBound,
      testcaseUpperBound: testcaseUpperBound,
      variableLetters: variableLetters,
      variablesAllInOne: variablesAllInOne,
      writtenVariables: writtenVariables,
      sidebarString: sidebarString,
      constrainedVariables: constrainedVariables,
    });
    setSavedInputs([] as any[]);
    setTestcaseLowerBound("");
    setTestcaseUpperBound("");
    setVariableLetters([] as string[]);
    setVariablesAllInOne([]);
    setWrittenVariables([] as string[]);
    setSidebarString(
      "// This is an example testcase format!\n// Content might not match with yours!\n// First line represents testcase count\n5\n"
    );
    setConstrainedVariables([] as ConstrainedVariableType[]);
    setTestcaseDDVariable("");
  };
  const undoTestCase = () => {
    setSavedInputs(lastInput.savedInputs);
    setTestcaseLowerBound(lastInput.testcaseLowerBound);
    setTestcaseUpperBound(lastInput.testcaseUpperBound);
    setVariableLetters(lastInput.variableLetters);
    setVariablesAllInOne(lastInput.variablesAllInOne);
    setWrittenVariables(lastInput.writtenVariables);
    setSidebarString(lastInput.sidebarString);
    setConstrainedVariables(lastInput.constrainedVariables);
  };
  const [sidebarString, setSidebarString] = useState(
    "// This is an example testcase format!\n// Content might not match with yours!\n// First line represents testcase count\n5\n"
  );
  const [isVariablePopUpOpen, setIsVariablePopUpOpen] = useState(false);
  const [isFileDDOpen, setIsFileDDOpen] = useState(false);
  const [fileExtension, setFileExtension] = useState("txt");
  const fileExtensionOptions = ["txt", "in", "gir"];
  const [isNumberingDDOpen, setIsNumberingDDOpen] = useState(false);
  const [numbering, setNumbering] = useState("00");
  const numberingOptions = ["00", "01", "1", "0"];
  const [fileAmount, setFileAmount] = useState("");
  const [fileName, setFileName] = useState("");
  const [sidebarVisible, setSidebarVisibility] = useState(true);

  const [isTestcaseDDOpen, setIsTestcaseDDOpen] = useState(false);
  const [testcaseDDVariable, setTestcaseDDVariable] = useState("");
  const [constrainedVariables, setConstrainedVariables] = useState(
    [] as ConstrainedVariableType[]
  );
  const [constraintText, setConstraintText] = useState("");
  const isLowerboundNumber = (e: string) => {
    for (let x of e) {
      if (x < "0" || x > "9") return false;
    }
    if (Number.isNaN(parseInt(e))) return false;
    return true;
  };
  const remainingConstrainableOptions = () => {
    const filteredData = writtenVariables.filter(
      (e) =>
        savedInputs.find(
          (elem) =>
            elem.type === "variable" &&
            elem.symbol === e &&
            isLowerboundNumber(elem.lowerBound)
        ) !== undefined &&
        constrainedVariables.find((elem) => elem.symbol === e) === undefined
    );
    if (testcaseDDVariable === "" && filteredData.length > 0) {
      setTestcaseDDVariable(filteredData[0]);
    }
    return filteredData;
  };
  const isAnyPopUpOpen = () => {
    if (
      isVariablePopUpOpen ||
      isArrayPopUpOpen ||
      isCharPopUpOpen ||
      isDoublePopUpOpen ||
      isGraphPopUpOpen ||
      isIntegerPopUpOpen ||
      isStringPopUpOpen ||
      isPairPopUpOpen
    )
      return true;
  };
  const isCreateButtonDisabled = () => {
    return isAnyPopUpOpen();
  };
  const isCompleteButtonDisabled = useMemo(() => {
    if (
      testcaseLowerBound.trim() === "" ||
      Number.isNaN(parseInt(testcaseLowerBound))
    )
      return true;
    for (let c2 of testcaseLowerBound) {
      if (c2 < "0" || c2 > "9") return true;
    }
    if (
      testcaseUpperBound.trim() === "" ||
      Number.isNaN(parseInt(testcaseUpperBound))
    )
      return true;
    for (let c2 of testcaseUpperBound) {
      if (c2 < "0" || c2 > "9") return true;
    }
    if (parseInt(testcaseLowerBound) > parseInt(testcaseUpperBound))
      return true;
    if (parseInt(testcaseLowerBound) <= 0) return true;
    if (fileAmount.trim() === "" || Number.isNaN(parseInt(fileAmount)))
      return true;
    for (let c2 of fileAmount) {
      if (c2 < "0" || c2 > "9") return true;
    }
    if (fileName.trim() === "") return true;
    for (let c2 of fileName) {
      if (
        (c2 >= "a" && c2 <= "z") ||
        (c2 >= "A" && c2 <= "Z") ||
        (c2 >= "0" && c2 <= "9")
      )
        continue;
      return true;
    }
    if (savedInputs.find((elem) => elem.type !== "newLine") === undefined) {
      return true;
    }
    if (codeFile === null) return true;
    return false;
  }, [
    testcaseLowerBound,
    testcaseUpperBound,
    fileAmount,
    fileName,
    savedInputs,
    codeFile,
  ]);

  const isEndLineNeeded = (element: any) => {
    if (element === undefined) return false;
    if (
      element.type === "array" ||
      element.type === "graph" ||
      element.type === "tree"
    ) {
      return true;
    }
    return false;
  };
  const isConstraintButtonDisabled = () => {
    const c1 = constraintText.trim() === "";
    const c2 = Number.isNaN(parseInt(constraintText));
    for (let element of constraintText) {
      if (element < "0" || element > "9") return true;
    }
    if (parseInt(constraintText) <= 0 || parseInt(constraintText) > 1000000)
      return true;
    if (remainingConstrainableOptions().length === 0) {
      return true;
    }
    return c1 || c2;
  };

  const findExtension = (e: string): string => {
    let dotIndex = 0;
    for (let i = 0; i < e.length; i++) {
      if (e[i] === ".") {
        dotIndex = i;
      }
    }
    return e.substring(dotIndex + 1, e.length);
  };
  const setCodeFileFunc = (e: FileList | null) => {
    if (
      e != null &&
      e.length >= 1 &&
      (findExtension(e[0].name) === "cpp" ||
        findExtension(e[0].name) === "java")
    ) {
      setCodeFile(e[0]);
    } else {
      notify.error("Problem in Frontend of Uploading File");
    }
  };

  if (createFileMutation.isLoading || codeUploadMutation.isLoading) {
    return <Loader />;
  }

  return (
    <LayoutPage>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="justify-content-center "
      >
        <Navbar.Brand>&nbsp;Testcase Generator&nbsp;</Navbar.Brand>
        &nbsp
        <Link to={PATHS.home} className="me-auto ms-auto">
          Home
        </Link>
        &nbsp
        <Link to={PATHS.aboutUs} className="me-auto ms-auto" style={{whiteSpace:"nowrap"}}>
          About Us
        </Link>
        &nbsp
        <Link to={PATHS.tutorial} className="me-auto ms-auto">
          Tutorial
        </Link>
        &nbsp
        <NavItem className="me-auto ms-auto text-secondary">
          Generate
        </NavItem>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{USERNAME}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar
        bg="gray"
        data-bs-theme="light"
        className="justify-content-center "
      >
        <Navbar.Brand className="ml-1">Generator Mode:</Navbar.Brand>
        <NavItem className="ml-4 text-secondary">In/Out Page</NavItem>
        <Link to={PATHS.hacking} className="ml-5 text-danger">
          Hacking Page
        </Link>
        <Container></Container>
      </Navbar>
      <div className="flex flex-col flex-center justify-center items-center mb-4">
        <div className="container-hider">
          <p className="font-bold text-base font-poppins mt-12 text-hider">
            <button
              className="button-hider"
              onClick={() =>
                testCaseHide ? setTestCaseHide(false) : setTestCaseHide(true)
              }
            >
              Testcase
            </button>
          </p>
        </div>
        {!testCaseHide && (
          <div className="flex flex-row mt-2 items-center justify-center">
            <div
              className="mr-8 items-center justify-center"
              onClick={() => openTutorialPopUp("testcaseInterval")}
            >
              <HiInformationCircle
                className="text-2xl text-center"
                color="#5302FF"
              />
            </div>
            <div className="w-20 ml-3">
              <Input
                isTextCentered
                value={testcaseLowerBound}
                onChange={(e) => setTestcaseLowerBound(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <Icon color="#0085FF" width="12" height="12" iconName="leq" />
            </div>
            <div className="w-9 ml-3">
              <Input disabled isTextCentered value={"t"} />
            </div>
            <div className="ml-3">
              <Icon color="#0085FF" width="12" height="12" iconName="leq" />
            </div>
            <div className="w-20 ml-3">
              <Input
                isTextCentered
                value={testcaseUpperBound}
                onChange={(e) => setTestcaseUpperBound(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="container-hider">
          <p className="font-bold text-base font-poppins mt-12 text-hider">
            <button
              className="button-hider"
              onClick={() =>
                defineIntegerHide
                  ? setDefineIntegerHide(false)
                  : setDefineIntegerHide(true)
              }
            >
              Define Integer Variables
            </button>
          </p>
        </div>
        {!defineIntegerHide && (
          <div className="flex flex-row mt-2 justify-center items-center">
            <div
              className="mr-8 items-center justify-center"
              onClick={() => openTutorialPopUp("defineVariables")}
            >
              <HiInformationCircle
                className="text-2xl text-center"
                color="#5302FF"
              />
            </div>
            {variableLetters.map((e, index) => (
              <div className={index === 0 ? "w-9" : "ml-4 w-9"} key={index}>
                <Input value={e} disabled={true} isTextCentered />
              </div>
            ))}
            {variableLetters.length === 0 && (
              <div>
                <Button
                  buttonSize="medium"
                  buttonType="purple"
                  onClick={() => {
                    setIsIntegerPopUpOpen(true);
                    setIsVariablePopUpOpen(true);
                  }}
                >
                  <div className="flex flex-row justify-center items-center">
                    Add
                    <div className="ml-2">
                      <FaPlus className="text-xs" />
                    </div>
                  </div>
                </Button>
              </div>
            )}
            {variableLetters.length > 0 && (
              <div
                className="ml-4"
                onClick={() => {
                  setIsIntegerPopUpOpen(true);
                  setIsVariablePopUpOpen(true);
                }}
              >
                <Icon color="#5302FF" iconName="plus" height="24" width="24" />
              </div>
            )}
          </div>
        )}

        <div className="container-hider">
          <p className="font-bold text-base font-poppins mt-12 text-hider">
            <button
              className="button-hider"
              onClick={() =>
                testCaseFormatHide
                  ? setTestCaseFormatHide(false)
                  : setTestCaseFormatHide(true)
              }
            >
              Testcase Format
            </button>
          </p>
        </div>
        {!testCaseFormatHide && (
          <div className="flex flex-row mt-2 z-40">
            <div
              className="mr-8 items-center justify-center mt-1"
              onClick={() => openTutorialPopUp("testcaseFormat")}
            >
              <HiInformationCircle
                className="text-2xl text-center"
                color="#5302FF"
              />
            </div>
            <Dropdown
              closeMenu={() => setIsVarDDOpen(false)}
              openMenu={() => setIsVarDDOpen(true)}
              isOpen={isVarDDOpen}
              options={variableTypes}
              selectedOption={selectedVar}
              changeOption={(e: string) => {
                setSelectedVar(e);
                setIsVarDDOpen(false);
              }}
              disabledMenuItems={
                variableLetters.length > 0 ? [] : ["Defined Variable"]
              }
            />
            {selectedVar === "Defined Variable" && (
              <div className="ml-3">
                <Dropdown
                  isOpen={isVarSymbolDDOpen}
                  closeMenu={() => setIsVarSymbolDDOpen(false)}
                  openMenu={() => setIsVarSymbolDDOpen(true)}
                  changeOption={(e: string) => {
                    setVarSymbolDD(e);
                    setIsVarSymbolDDOpen(false);
                  }}
                  options={variableLetters}
                  selectedOption={varSymbolDD}
                />
              </div>
            )}
            <div className="ml-3 w-[84px]">
              <Button
                buttonSize="medium"
                buttonType="purple"
                onClick={() => {
                  openPopUp(selectedVar as VariableType);
                  if (selectedVar === "Defined Variable") {
                    setSidebarString(
                      sidebarString +
                        (savedInputs.length >= 1 &&
                        isEndLineNeeded(savedInputs[savedInputs.length - 1])
                          ? "\n"
                          : "") +
                        (sidebarString.length > 0 ? " " : "") +
                        getSidebarInputs("Integer")
                    );
                  }
                }}
                disabled={isCreateButtonDisabled()}
              >
                <div className="flex flex-row justify-center items-center">
                  Create
                  <div className="ml-2">
                    <IoMdSettings />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {!testCaseFormatHide && (
          <div className="flex flex-row mt-2">
            <div className="w-fit">
              <Button
                buttonSize="medium"
                buttonType="blue"
                onClick={() => {
                  setSidebarString(sidebarString + "\n");
                  setSavedInputs([...savedInputs, { type: "newLine" }]);
                }}
              >
                <div className="flex flex-row justify-center items-center">
                  Finish Line
                </div>
              </Button>
            </div>
            <div className="w-fit ml-3">
              <Button
                buttonSize="medium"
                buttonType="red"
                onClick={resetTestCase}
              >
                <div className="flex flex-row justify-center items-center">
                  Reset Testcase
                  <div className="ml-3">
                    <BsFillTrash3Fill />
                  </div>
                </div>
              </Button>
            </div>
            <div className="w-fit ml-3">
              <Button
                buttonSize="medium"
                buttonType="purple"
                onClick={undoTestCase}
              >
                <div className="flex flex-row justify-center items-center">
                  Undo Testcase
                  <div className="ml-3">
                    <FaUndo className="text-xs" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}
        {isIntegerPopUpOpen && (
          <div className="mt-4 z-50">
            <IntegerPopUp
              isVariable={
                isVariablePopUpOpen || selectedVar === "Defined Variable"
              }
              options={variableLetterOptions.filter(
                (e: string) => foundInVariables(e) === true
              )}
              variableLetters={variableLetters}
              setVariablesArray={(e: any) => {
                setVariablesAllInOne([...variablesAllInOne, e]);
              }}
              setVariableLetterArray={(e: string) =>
                setVariableLetters([...variableLetters, e])
              }
              closePopUp={() => {
                setIsIntegerPopUpOpen(false);
                setIsVariablePopUpOpen(false);
              }}
              changeSavedInputs={(e: any) => {
                !(isVariablePopUpOpen || selectedVar === "Defined Variable") &&
                  setSidebarString(
                    sidebarString +
                      (isEndLineNeeded(savedInputs[savedInputs.length - 1])
                        ? "\n"
                        : "") +
                      (sidebarString.length > 0 ? " " : "") +
                      getSidebarInputs(
                        convertTypeToContentType(e.type as string)
                      )
                  );
                setSavedInputs([...savedInputs, e]);
              }}
            />
          </div>
        )}
        {isCharPopUpOpen && (
          <div className="mt-4 z-50">
            <CharPopUp
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (isEndLineNeeded(savedInputs[savedInputs.length - 1])
                      ? "\n"
                      : "") +
                    (sidebarString.length > 0 ? " " : "") +
                    getSidebarInputs("Char")
                );
                setSavedInputs([...savedInputs, e]);
              }}
              closePopUp={() => setIsCharPopUpOpen(false)}
            />
          </div>
        )}
        {isStringPopUpOpen && (
          <div className="mt-4 z-50">
            <StringPopUp
              variableLetters={variableLetters}
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (isEndLineNeeded(savedInputs[savedInputs.length - 1])
                      ? "\n"
                      : "") +
                    (sidebarString.length > 0 ? " " : "") +
                    getSidebarInputs("String")
                );
                setSavedInputs([...savedInputs, e]);
              }}
              closePopUp={() => setIsStringPopUpOpen(false)}
            />
          </div>
        )}
        {isGraphPopUpOpen && (
          <div className="mt-4 z-50">
            <GraphPopUp
              variableLetters={writtenVariables}
              closePopUp={() => setIsGraphPopUpOpen(false)}
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (sidebarString.length > 0 &&
                    savedInputs.length > 0 &&
                    savedInputs[savedInputs.length - 1].type !== "newLine"
                      ? "\n"
                      : "") +
                    getSidebarInputs(
                      e.type === "tree" ? "Tree" : "Graph",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      e.indexStyle === "0-indexed",
                      e.isWeighted
                    )
                );
                setSavedInputs([...savedInputs, e]);
              }}
            />
          </div>
        )}
        {isDoublePopUpOpen && (
          <div className="mt-4 z-50">
            <DoublePopUp
              variableLetters={variableLetters}
              closePopUp={() => setIsDoublePopUpOpen(false)}
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (isEndLineNeeded(savedInputs[savedInputs.length - 1])
                      ? "\n"
                      : "") +
                    (sidebarString.length > 0 ? " " : "") +
                    getSidebarInputs("Double")
                );
                setSavedInputs([...savedInputs, e]);
              }}
            />
          </div>
        )}
        {isArrayPopUpOpen && (
          <div className="mt-4 z-50">
            <ArrayPopUp
              variableLetters={writtenVariables}
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (sidebarString.length > 0 &&
                    savedInputs.length > 0 &&
                    savedInputs[savedInputs.length - 1].type !== "newLine"
                      ? "\n"
                      : "") +
                    getSidebarInputs(
                      "Array",
                      convertTypeToContentType(e.contentFormat.type),
                      undefined,
                      e.size.length === 1 ? "1-D" : "2-D",
                      convertTypeToContentType(
                        e.contentFormat.firstContent?.type
                      ),
                      convertTypeToContentType(
                        e.contentFormat.secondContent?.type
                      )
                    )
                );
                setSavedInputs([...savedInputs, e]);
              }}
              closePopUp={() => setIsArrayPopUpOpen(false)}
            />
          </div>
        )}
        {isPairPopUpOpen && (
          <div className="mt-4 z-50">
            <PairPopUp
              variableLetters={variableLetters}
              changeSavedInputs={(e: any) => {
                setSidebarString(
                  sidebarString +
                    (isEndLineNeeded(savedInputs[savedInputs.length - 1])
                      ? "\n"
                      : "") +
                    (sidebarString.length > 0 ? " " : "") +
                    getSidebarInputs(
                      "Pair",
                      convertTypeToContentType(e.firstContent.type),
                      convertTypeToContentType(e.secondContent.type)
                    )
                );
                setSavedInputs([...savedInputs, e]);
              }}
              closePopUp={() => setIsPairPopUpOpen(false)}
            />
          </div>
        )}
        <div className="container-hider">
          <p className="font-bold text-base font-poppins mt-12 text-hider">
            <button
              className="button-hider"
              onClick={() =>
                constraintsHide
                  ? setConstraintsHide(false)
                  : setConstraintsHide(true)
              }
            >
              Testcase Constraints
            </button>
          </p>
        </div>
        {!constraintsHide && (
          <div className="flex flex-col mt-2 justify-center items-center">
            {constrainedVariables.length > 0 &&
              constrainedVariables.map((e, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-center items-center mt-2"
                >
                  <div className="w-9">
                    <Input value={e.symbol} isTextCentered disabled />
                  </div>
                  <div className="ml-3">
                    <Icon
                      color="#0085FF"
                      width="12"
                      height="12"
                      iconName="leq"
                    />
                  </div>
                  <div className="w-20 ml-3">
                    <Input value={e.sumValue} isTextCentered disabled />
                  </div>
                  <div
                    className="ml-4 w-fit"
                    onClick={() =>
                      setConstrainedVariables([
                        ...constrainedVariables.filter(
                          (elem) => elem.symbol !== e.symbol
                        ),
                      ])
                    }
                  >
                    <BsFillTrash3Fill
                      className="text-xl text-center"
                      color="#F03434"
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
        {!constraintsHide && (
          <div className="flex flex-row mt-2 justify-center">
            <div
              className="mr-8 items-center justify-center mt-1"
              onClick={() => openTutorialPopUp("testcaseConstraints")}
            >
              <HiInformationCircle
                className="text-2xl text-center"
                color="#5302FF"
              />
            </div>
            <p className="font-poppins font-bold text-sm mt-2">Sum of</p>
            <div className="ml-3">
              <Dropdown
                isOpen={isTestcaseDDOpen}
                closeMenu={() => setIsTestcaseDDOpen(false)}
                openMenu={() => setIsTestcaseDDOpen(true)}
                options={remainingConstrainableOptions()}
                changeOption={(e: string) => {
                  setTestcaseDDVariable(e);
                  setIsTestcaseDDOpen(false);
                }}
                selectedOption={testcaseDDVariable}
                disabled={remainingConstrainableOptions().length === 0}
              />
            </div>
            <div className="ml-3 mt-2">
              <Icon color="#0085FF" width="12" height="12" iconName="leq" />
            </div>
            <div className="ml-3 w-20">
              <Input
                isTextCentered
                value={constraintText}
                onChange={(e) => setConstraintText(e.target.value)}
              />
            </div>
            <div className="w-fit ml-3">
              <Button
                buttonSize="large"
                buttonType="purple"
                disabled={isConstraintButtonDisabled()}
                onClick={() => {
                  setConstrainedVariables([
                    ...constrainedVariables,
                    {
                      symbol: testcaseDDVariable,
                      sumValue: parseInt(constraintText),
                    },
                  ]);
                  setTestcaseDDVariable("");
                  setConstraintText("");
                }}
              >
                <div className="flex flex-row justify-center items-center">
                  Add
                  <div className="ml-2">
                    <FaPlus className="text-xs" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}
        {isTutorialPopUpOpen && (
          <div className="absolute z-50 top-20 left-12">
            <InformationPopUp
              informationType={tutorialType}
              close={() => setIsTutorialPopUpOpen(false)}
            />
          </div>
        )}
        <div className="container-hider">
          <p className="font-bold text-base font-poppins mt-12 text-hider">
            <button
              className="button-hider"
              onClick={() =>
                fileFormatHide
                  ? setFileFormatHide(false)
                  : setFileFormatHide(true)
              }
            >
              File Format
            </button>
          </p>
        </div>
        {!fileFormatHide && (
          <div className="flex flex-row mt-2 justify-center">
            <div
              className="mr-8 items-center justify-center mt-1"
              onClick={() => openTutorialPopUp("fileFormat")}
            >
              <HiInformationCircle
                className="text-2xl text-center"
                color="#5302FF"
              />
            </div>
            <p className="font-poppins font-bold text-sm mt-2">Amount: </p>
            <div className="ml-3 w-16">
              <Input
                isTextCentered
                value={fileAmount}
                onChange={(e) => setFileAmount(e.target.value)}
              />
            </div>
            <p className="font-poppins font-bold text-sm ml-4 mt-2">Name: </p>
            <div className="ml-3 w-20">
              <Input
                isTextCentered
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <p className="font-poppins font-bold text-sm ml-4 mt-2">
              Extension:{" "}
            </p>
            <div className="w-fit ml-3">
              <Dropdown
                isOpen={isFileDDOpen}
                closeMenu={() => setIsFileDDOpen(false)}
                openMenu={() => setIsFileDDOpen(true)}
                options={fileExtensionOptions}
                changeOption={(e: string) => {
                  setFileExtension(e);
                  setIsFileDDOpen(false);
                }}
                selectedOption={fileExtension}
              />
            </div>
            <p className="font-poppins font-bold text-sm ml-4 mt-2">
              Numbering:{" "}
            </p>
            <div className="w-fit ml-3">
              <Dropdown
                isOpen={isNumberingDDOpen}
                openMenu={() => setIsNumberingDDOpen(true)}
                closeMenu={() => setIsNumberingDDOpen(false)}
                options={numberingOptions}
                selectedOption={numbering}
                changeOption={(e: string) => {
                  setNumbering(e);
                  setIsNumberingDDOpen(false);
                }}
              />
            </div>
          </div>
        )}
        {!fileFormatHide && (
          <div className="w-fit mt-12">
            <Input
              type="file"
              accept=".cpp, .java"
              onChange={(e) => setCodeFileFunc(e.target.files)}
            />
          </div>
        )}
        <div className="flex flex-row mt-12">
          <div className="w-fit">
            <Button
              buttonSize="large"
              buttonType="black"
              disabled={isCompleteButtonDisabled}
              onClick={createFile}
            >
              <div className="flex flex-row justify-center items-center">
                Complete
                <div className="ml-1 text-lg">
                  <TiTickOutline />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div
          className="fixed right-0 w-1/4 h-2/3"
          style={{ top: "20%", width: sidebarVisible ? "20%" : "1%" }}
          onDoubleClick={() => {
            setSidebarVisibility(!sidebarVisible);
          }}
        >
          <FormatSidebar sidebarString={sidebarString} />
        </div>
    </LayoutPage>
  );
}
